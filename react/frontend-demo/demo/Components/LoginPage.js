import { React, useState } from 'react';
import { SafeAreaView, Text, useColorScheme } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useMutation } from '@apollo/client';
import { loginMutation } from '../graphql/mutation';

const LoginPage = ({ onLogin }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { error }] = useMutation(loginMutation);
  
    const login = async () => {
      try {
        const { data } = await loginUser({ variables: { email, password } });

        await AsyncStorage.setItem('token', data.login);
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