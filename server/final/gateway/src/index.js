const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const { readFileSync } = require("fs");

class AuthDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    const headers = context.req?.headers;
    if (headers) {
      for (const key in headers) {
        const value = headers[key];
        if (value) {
          request.http?.headers?.set(key, String(value));
        }
      }
    }
  }
}

const supergraphSdl = readFileSync("./src/supergraph.graphql").toString();

const gateway = new ApolloGateway({
  supergraphSdl,
  buildService({ name, url }) {
    return new AuthDataSource({ url });
  },
});

const server = new ApolloServer({
  gateway,
  context: ({ req, res }) => ({
    req,
    res
  }),
});

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
