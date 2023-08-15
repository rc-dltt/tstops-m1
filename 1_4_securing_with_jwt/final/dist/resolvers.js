"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const error_1 = require("graphql/error");
const jsonwebtoken_1 = require("jsonwebtoken");
const requireRole = (role, principal, usersCollection) => {
    const user = usersCollection.get(principal);
    if (!user?.roles?.includes(role))
        throw new error_1.GraphQLError(`you must be logged in as ${role} to execute this operation`, {
            extensions: {
                code: "UNAUTHORIZED",
            },
        });
};
exports.resolvers = {
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
        login(_, { email, password }, { dataSources }) {
            const { id, roles } = dataSources.users
                .list()
                .find((user) => user.email === email && user.password === password);
            return (0, jsonwebtoken_1.sign)({ id, roles }, process.env.JWT_SECRET, {
                algorithm: "HS256",
                subject: id,
                expiresIn: "1d",
            });
        },
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
        horses: (parent, __, { dataSources }) => {
            return dataSources.horses
                .list()
                .filter((horse) => horse.race === parent.id);
        },
    },
    Horse: {
        race: (parent, _, { dataSources }) => {
            return dataSources.races.get(parent.race);
        },
    },
};
