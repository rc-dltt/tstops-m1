import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "apollo-link-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';


const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4003/',
    // connectionParams: { // to add ws auth
    //   authToken: getToken(),
    // },
  }),
);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/"
});

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

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;