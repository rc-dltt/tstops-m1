import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from "graphql-tag";
import { readFileSync } from "node:fs";
import { config } from "dotenv";

import { buildContext } from "./context";
import { resolvers } from "./resolvers";

config();

const schema = readFileSync("./src/schema.graphql", "utf8");
const typeDefs = gql(schema);

async function start() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });
  const PORT = parseInt(process.env.PORT || "4002");
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: buildContext,
  });
  console.log(`Server is running at ${url}`);
}

start();
