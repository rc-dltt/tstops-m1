import { React, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput
} from 'react-native';
import { useMutation, useReactiveVar } from '@apollo/client';
import { Dialog, Portal, Button } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { addHorseMutation } from '../graphql/mutation';
import { horseListVar } from '../localState';
import { allHorseQuery } from '../graphql/query';

const AddHorsePage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    ////////// Mutations //////////////
    const [addHorse] = useMutation(addHorseMutation, {
        onCompleted: (data) => {
            console.log(data, 'Mutaion Data')
            const currentHorses = horseListVar();
            horseListVar([...currentHorses, data.addHorse])
        }
    });

    const [horseNameInput, setHorseNameInput] = useState('');
    const [horseRankInput, setHorseRankInput] = useState('');
    const [addHorseSuccess, setAddHorseSuccess] = useState(false);

    // Add Horse Input Change
    const handleHorseNameInputChange = (input) => {
        setHorseNameInput(input);
    };
    const handleHorseRankInputChange = (input) => {
        setHorseRankInput(input);
    };

    // Submit - Add Horse
    const handleSubmitAddHorse = () => {
        if (horseNameInput !== "" && horseRankInput !== "") {
            addHorse({
                variables: {
                    command: {
                        name: horseNameInput,
                        rank: Number(horseRankInput)
                    }
                }
            })
            setAddHorseSuccess(true);
        } else {
            return
        }
    };

    const successDialogClose = () => {
        setHorseNameInput('');
        setHorseRankInput('');
        setAddHorseSuccess(false);
    }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle} >
            {/* Mutation - Add Horse */}

            < View style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }
            }>
                <Section title="Mutation - Add Horse" isDarkMode={isDarkMode}>
                    Input Horse Name and Horse Rank to Add Horse.
                </Section>
            </View >
            <TextInput
                style={styles.input}
                onChangeText={handleHorseNameInputChange}
                value={horseNameInput}
                placeholder="Enter Horse Name"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={handleHorseRankInputChange}
                value={horseRankInput}
                placeholder="Enter Horse Rank"
                keyboardType="default"
            />
            <Button mode="contained" style={{ margin: 12 }} onPress={handleSubmitAddHorse} buttonColor="#424d9c" textColor='#fbde2b' title="submit"><Text>Submit</Text></Button>
            <Portal>
                <Dialog visible={addHorseSuccess} onDismiss={successDialogClose}>
                    <Dialog.Title
                        style={{
                            color: "green",
                            textAlignVertical: "center",
                            textAlign: "center",
                            fontWeight: 'bold',
                            fontSize: 18,
                            margin: 12
                        }}
                    >Add Race Success!
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Successfully Added Horse - {horseNameInput}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button buttonColor="#424d9c" textColor='#fbde2b' onPress={successDialogClose}>Close</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView >
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

export default AddHorsePage;