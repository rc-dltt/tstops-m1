const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const { readFileSync } = require("fs");

const { PassThroughHeadersDataSource } = require("./PassThroughHeadersDataSource");
const { context } = require("./context");

const supergraphSdl = readFileSync("./src/supergraph.graphql").toString();

const gateway = new ApolloGateway({
  supergraphSdl,
  buildService({ name, url }) {
    return new PassThroughHeadersDataSource({ url });
  },
});

const server = new ApolloServer({
  gateway,
  context,
});

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
