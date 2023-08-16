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

export const resolvers = {
  Query: {
    users: (_, __, { dataSources, principal }) => {
      requireRole("admin", principal, dataSources.users);
      return dataSources.users.list();
    },
  },
  Mutation: {
    login(_, { email, password }, { dataSources }) {
      const { id, roles } = dataSources.users
        .list()
        .find((user) => user.email === email && user.password === password);
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
