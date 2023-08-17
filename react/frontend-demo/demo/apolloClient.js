import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "apollo-link-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpLink = createHttpLink({
//   uri: process.env.GRAPHQL_ENDPOINT,
  uri: "http://localhost:4001/"
});
const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };


console.log(process.env.GRAPHQL_ENDPOINT, 'EP')

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  console.log(token,'tk')
  return {
    headers: {
      ...headers,
      'x-access-token': token ? `${token}` : ""
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;