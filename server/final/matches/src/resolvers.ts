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
    matches: (_, { first, after }, { dataSources, principal }) => {
      requireRole("user", principal, dataSources.users);
      return paginate(dataSources.matches, { first, after });
    },
    teams: (_, { first, after }, { dataSources, principal }) => {
      requireRole("user", principal, dataSources.users);
      return paginate(dataSources.teams, { first, after });
    },
    players: (_, { first, after }, { dataSources, principal }) => {
      requireRole("user", principal, dataSources.users);
      return paginate(dataSources.players, { first, after });
    },
  },
  Mutation: {
    addPlayer: (_, { command }, { dataSources, principal }) => {
      requireRole("admin", principal, dataSources.users);
      const id = dataSources.players.create(command);
      let team = null;
      if (command.team) {
        team = dataSources.teams.get(command.team);
      }
      return {
        id,
        name: command.name,
        age: command.age,
        team: team,
      };
    },
    addTeam: (_, { command }, { dataSources, principal }) => {
      requireRole("admin", principal, dataSources.users);
      const id = dataSources.teams.create(command);
      return {
        id,
        name: command.name,
        country: command.country,
        players: [],
      };
    },
    addMatch: (_, { command }, { dataSources, principal }) => {
      requireRole("admin", principal, dataSources.users);
      const id = dataSources.matches.create(command);
      const homeTeam = dataSources.teams.get(command.homeTeam);
      const visitorsTeam = dataSources.teams.get(command.visitorsTeam);
      return {
        id,
        no: command.no,
        startTime: command.startTime,
        venue: command.venue,
        country: command.country,
        homeTeam,
        visitorsTeam,
      };
    },
    joinTeam: (_, { command }, { dataSources, principal }) => {
      requireRole("user", principal, dataSources.users);
      const player = dataSources.players.get(command.player);
      player.team = command.team;
      dataSources.horses.update(player);
      return player;
    },
  },
  FootballMatch: {
    __resolveReference(match, { dataSources }) {
      return dataSources.matches.get(match.id);
    },
    homeTeam: (parent, __, { dataSources }) => {
      return dataSources.teams.get(parent.homeTeam);
    },
    visitorsTeam: (parent, __, { dataSources }) => {
      return dataSources.teams.get(parent.visitorsTeam);
    },
  },
  Team: {
    __resolveReference(team, { dataSources }) {
      return dataSources.teams.get(team.id);
    },
    players: (parent, __, { dataSources }) => {
      return dataSources.players
        .list()
        .filter((player) => player.team === parent.id);
    },
  },
  Player: {
    __resolveReference(player, { dataSources }) {
      return dataSources.players.get(player.id);
    },
    team: (parent, __, { dataSources }) => {
      return dataSources.teams.get(parent.team);
    },
  },
};
