import { React, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { loginMutation } from '../graphql/mutation';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { error }] = useMutation(loginMutation);
  
    const login = async () => {
      try {
        const { data } = await loginUser({ variables: { email, password } });
        await AsyncStorage.setItem('jwtToken', data.loginUser.token);
        onLogin(); // Notify the parent component that the login was successful
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
        <SafeAreaView style={backgroundStyle}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Button mode="contained" onPress={login}>
          Login
        </Button>
        {error && <Text>{error.message}</Text>}
        </SafeAreaView>
    );
  };
  
  export default LoginPage;