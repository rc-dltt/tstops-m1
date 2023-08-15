"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const node_fs_1 = require("node:fs");
const dotenv_1 = require("dotenv");
const context_1 = require("./context");
const resolvers_1 = require("./resolvers");
(0, dotenv_1.config)();
const typeDefs = (0, node_fs_1.readFileSync)("./src/schema.graphql", "utf8");
async function start() {
    const server = new server_1.ApolloServer({
        typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    const PORT = parseInt(process.env.PORT || "4001");
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: PORT },
        context: context_1.buildContext,
    });
    console.log(`Server is running at ${url}`);
}
start();
