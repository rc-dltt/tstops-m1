import { React, useState } from 'react';
import { SafeAreaView, Text, useColorScheme, Image } from 'react-native';
import { Button, TextInput, Card, Dialog, Portal, HelperText } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useMutation } from '@apollo/client';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginMutation } from '../graphql/mutation';
import { emailValidationSchema, passwordValidationSchema } from '../validationSchema';

const LoginPage = ({ onLogin }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState('');

  const [loginUser, { error }] = useMutation(loginMutation);

  const [errDialog, setErrDialog] = useState(false);

  const errDialogClose = () => {
    setErrDialog(false);
  }

  const emailValidateInput = async () => {
    try {
      await emailValidationSchema.validate({ email });
      setEmailErrMsg('');
      setEmailErr(false);
    } catch (error) {
      if (error.errors && error.errors[0]) {
        setEmailErrMsg(error.errors[0]);
        setEmailErr(true);
      }
    }
  }

  const passwordValidateInput = async () => {
    try {
      await passwordValidationSchema.validate({ password });
      setPasswordErrMsg('');
      setPasswordErr(false);
    } catch (error) {
      if (error.errors && error.errors[0]) {
        setPasswordErrMsg(error.errors[0]);
        setPasswordErr(true);
      }
    }
  }

  const login = async () => {
    try {
      emailValidateInput();
      passwordValidateInput();
      if (!emailErr && !passwordErr) {
        const { data } = await loginUser({ variables: { email: email, password: password } });
        await AsyncStorage.setItem('token', data.login);
        onLogin();
      }
    } catch (err) {
      setErrDialog(true);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Image
        source={require("../img/hkjc-icon.png")}
      />
      <Card>
        <Card.Content>
          <Text
            variant="titleLarge"
            style={{
              color: "#424d9c",
              textAlignVertical: "center",
              textAlign: "center",
              fontWeight: 'bold',
              fontSize: 24,
              margin: 12
            }}
          >
            Login
          </Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            textColor="#505f93"
            backgroundColor="#Eceffb"
            theme={{
              colors: {
                text: "#505f93",
                accent: "#505f93",
                primary: "#424d9c",
                placeholder: "#424d9c",
                background: "#Eceffb"
              }
            }}
            style={{ margin: 12 }}
          />
          <HelperText type="error" visible={emailErr}>
            {emailErrMsg}
          </HelperText>
          <TextInput
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            textColor="#505f93"
            backgroundColor="#Eceffb"
            theme={{
              colors: {
                text: "#505f93",
                accent: "#505f93",
                primary: "#424d9c",
                placeholder: "#424d9c",
                background: "#Eceffb"
              }
            }}
            style={{ margin: 12 }}
          />
          <HelperText type="error" visible={passwordErr}>
            {passwordErrMsg}
          </HelperText>

          <Button mode="contained" onPress={login} buttonColor="#424d9c" textColor='#fbde2b' style={{ margin: 12 }}>
            Login
          </Button>
        </Card.Content>
      </Card>
      <Portal>
        <Dialog visible={errDialog} onDismiss={errDialogClose}>
          <Dialog.Title
            style={{
              color: "#AD5142",
              textAlignVertical: "center",
              textAlign: "center",
              fontWeight: 'bold',
              fontSize: 18,
              margin: 12
            }}
          >Login Error</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{error && <Text>{error.message}</Text>}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button buttonColor="#424d9c" textColor='#fbde2b' onPress={errDialogClose}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default LoginPage;