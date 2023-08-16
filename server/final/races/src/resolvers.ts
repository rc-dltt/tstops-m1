import { GraphQLError } from "graphql/error";

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
    races: (_, __, { dataSources, principal }) => {
      requireRole("user", principal, dataSources.users);
      return dataSources.races.list();
    },
    horses: (_, __, { dataSources, principal }) => {
      requireRole("user", principal, dataSources.users);
      return dataSources.horses.list();
    },
  },
  Mutation: {
    addRace: (_, { command }, { dataSources, principal }) => {
      requireRole("admin", principal, dataSources.users);
      command.horses = [];
      const id = dataSources.races.create(command);
      return {
        id,
        no: command.no,
        startTime: command.startTime,
        venue: command.venue,
        horses: command.horses,
      };
    },
    addHorse: (_, { command }, { dataSources, principal }) => {
      requireRole("admin", principal, dataSources.users);
      const id = dataSources.horses.create(command);
      return {
        id,
        name: command.name,
        rank: command.rank,
      };
    },
    enrollHorse: (_, { command }, { dataSources, principal }) => {
      requireRole("user", principal, dataSources.users);
      const horse = dataSources.horses.get(command.horse);
      horse.race = command.race;
      dataSources.horses.update(horse);
      return horse;
    },
  },
  Race: {
    __resolveReference(race, { dataSources }) {
      return dataSources.races.get(race.id);
    },
    horses: (parent, __, { dataSources }) => {
      return dataSources.horses
        .list()
        .filter((horse) => horse.race === parent.id);
    },
  },
  Horse: {
    __resolveReference(horse, { dataSources }) {
      return dataSources.horses.get(horse.id);
    },
    race: (parent, _, { dataSources }) => {
      return dataSources.races.get(parent.race);
    },
  },
};
