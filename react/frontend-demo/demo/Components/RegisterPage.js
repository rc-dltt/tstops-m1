import { React, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    Button
} from 'react-native';
import { useMutation } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { registerMutation } from '../graphql/users/mutation';

const RegisterPage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    ////////// Mutations //////////////
    const [register] = useMutation(registerMutation);

    const [userNameInput, setUserNameInput] = useState('');
    const [userEmailInput, setUserEmailInput] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);

    // Register Input Change
    const handleUserNameInputChange = (input) => {
        setUserNameInput(input);
    };
    const handleUserEmailInputChange = (input) => {
        setUserEmailInput(input);
    };

    // Submit - Register
    const handleSubmitRegister = (e) => {
        e.preventDefault();
        if (userNameInput !== '' && userEmailInput !== '') {
          register({
            variables: {
              command: {
                email: userEmailInput,
                name: userNameInput,
                roles: ['user'],
                password: 'pAsSWoRd!',
              },
            },
          });
          setRegisterSuccess(true);
        } else {
          return;
        }
    };

    return (
      // <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* Mutation - Register */}

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Mutation - Register User" isDarkMode={isDarkMode}>
            Input Name and Email to Add User.
          </Section>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={handleUserNameInputChange}
          value={userNameInput}
          placeholder="Enter Name"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={handleUserEmailInputChange}
          value={userEmailInput}
          placeholder="Enter Email"
          keyboardType="default"
        />
        <Button title="Submit" onPress={handleSubmitRegister} />
        {/* // </SafeAreaView> */}
      </ScrollView>
    );

};
const Section = (props) => {
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: props.isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {props.title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: props.isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {props.children}
            </Text>
        </View>
    );
};
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    }
});

export default RegisterPage;