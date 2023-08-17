const { RemoteGraphQLDataSource } = require("@apollo/gateway");

exports.PassThroughHeadersDataSource = class extends RemoteGraphQLDataSource {
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
