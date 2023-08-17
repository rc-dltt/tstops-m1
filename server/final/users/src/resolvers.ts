import { GraphQLError } from "graphql/error";
import { sign } from "jsonwebtoken";

const requireRole = (role, principal, usersCollection) => {
  const user = usersCollection.get(principal);
  if (!user?.roles?.includes(role))
    throw new GraphQLError(
      `you must be logged in as ${role} to execute this operation`,
      {
        extensions: {
          code: "UNAUTHORIZED",
        },
      }
    );
};

function paginate(set, { first, after }) {
  const collection = set.list();
  const item = set.get(after);
  const index = collection.indexOf(item);
  const start = index === -1 ? 0 : index + 1;
  const end = start + first;
  return collection.slice(start, end);
}

export const resolvers = {
  Query: {
    users: (_, { first, after }, { dataSources, principal }) => {
      requireRole("admin", principal, dataSources.users);
      return paginate(dataSources.users, { first, after });
    },
  },
  Mutation: {
    login(_, { email, password }, { dataSources }) {
      const { id, roles } = dataSources.users
        .list()
        .find(
          (user) =>
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
        );
      return sign({ id, roles }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        subject: id,
        expiresIn: "1d",
      });
    },
    register: (_, { command }, { dataSources, principal }) => {
      requireRole("admin", principal, dataSources.users);
      const id = dataSources.users.create(command);
      return {
        id,
        name: command.name,
        email: command.email,
        roles: command.roles,
      };
    },
  },
  User: {
    __resolveReference(user, { dataSources }) {
      return dataSources.user.get(user.id);
    },
  },
};
