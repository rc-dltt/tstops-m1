import { React, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { PaperProvider } from 'react-native-paper';
import LandingPage from './Components/LandingPage';
import LoginPage from './Components/LoginPage';
import client from './apolloClient';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };
  console.log(loggedIn, 'login')

  return (
    <ApolloProvider client={client}>
      <PaperProvider>
      {loggedIn ? <LandingPage /> : <LoginPage onLogin={handleLogin} />}
      </PaperProvider>
    </ApolloProvider>
  );
};

export default App;