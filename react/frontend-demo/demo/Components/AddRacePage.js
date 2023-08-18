import { React, useState, useCallback } from 'react';
import {
    StyleSheet,
    useColorScheme,
    ScrollView,
    View,
    TextInput,
    Text
} from 'react-native';
import { useMutation } from '@apollo/client';
import { Dialog, Portal, Button } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { addRaceMutation } from '../graphql/mutation';

const AddRacePage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    ////////// Mutations //////////////
    const [addRace] = useMutation(addRaceMutation);

    const [raceNoInput, setRaceNoInput] = useState('');
    const [raceTimeInput, setRaceTimeInput] = useState('');
    const [raceVenueInput, setRaceVenueInput] = useState('');
    const [addRaceSuccess, setAddRaceSuccess] = useState(false);

    // Add Race Input Change
    const handleRaceNoInputChange = (input) => {
        setRaceNoInput(input);
    };
    const handleRaceTimeInputChange = (input) => {
        setRaceTimeInput(input);
    };
    const handleRaceVenueInputChange = (input) => {
        setRaceVenueInput(input);
    };

    const successDialogClose = () => {
        setAddRaceSuccess(false);
    }

    // Submit - Add Race
    const handleSubmitAddRace = () => {
        if (raceNoInput !== "" && raceTimeInput !== "" && raceVenueInput !== "") {

            addRace({
                variables: {
                    command: {
                        no: Number(raceNoInput),
                        startTime: raceTimeInput,
                        venue: raceVenueInput
                    }
                }
            })
            setAddRaceSuccess(true);
        } else {
            return
        }
    };

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            {/* Mutation - Add Race */}

            <View style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
                <Section title="Mutation - Add Race" isDarkMode={isDarkMode}>
                    Input Race Number, Start Time and Venue to Add Race.
                </Section>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={handleRaceNoInputChange}
                value={raceNoInput}
                placeholder="Enter Race Number"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={handleRaceTimeInputChange}
                value={raceTimeInput}
                placeholder="Enter Race Start Time"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={handleRaceVenueInputChange}
                value={raceVenueInput}
                placeholder="Enter Race Venue"
                keyboardType="default"
            />
            <Button mode="contained" style={{ margin: 12 }} onPress={handleSubmitAddRace} buttonColor="#424d9c" textColor='#fbde2b' title="submit"><Text>Submit</Text></Button>

            {/* <Portal>
                <Dialog visible={addRaceSuccess} onDismiss={successDialogClose}>
                    <Dialog.Title
                        style={{
                            color: "#AD5142",
                            textAlignVertical: "center",
                            textAlign: "center",
                            fontWeight: 'bold',
                            fontSize: 18,
                            margin: 12
                        }}
                    >Add Race Success!
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Successfully Added Race - {raceNoInput}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button buttonColor="#424d9c" textColor='#fbde2b' onPress={successDialogClose}>Close</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal> */}
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

export default AddRacePage;