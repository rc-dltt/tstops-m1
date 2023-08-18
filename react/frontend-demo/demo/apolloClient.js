import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "apollo-link-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { horseListVar } from './localState';

const httpLink = createHttpLink({
  uri: "http://localhost:4000/"
});
const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      'x-access-token': token ? `${token}` : ""
    }
  }
});

const cache = new InMemoryCache(
  {
  typePolicies: {
    Query: {
      fields: {
        horses: {
          read() {
            return horseListVar();
          },
        },
      },
    },
  },
}
);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export default client;