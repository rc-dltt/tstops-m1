import { React, useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    TextInput,
    Button
} from 'react-native';
import { useMutation } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { enrollHorseMutation } from '../mutation';

const EnrollHorse = () => {

    ////////// Mutations //////////////
    const [enrollHorse] = useMutation(enrollHorseMutation);

    const [raceIdInput, setRaceIdInput] = useState('');
    const [horseIdInput, setHorseIdInput] = useState('');
    const [enrollHorseSuccess, setEnrollHorseSuccess] = useState(false);

    // Eroll Horse Input Change
    const handleRaceIdInputChange = (input) => {
        setRaceIdInput(input);
    };
    const handleHorseIdInputChange = (input) => {
        setHorseIdInput(input);
    };

    // Submit - Enroll Horse
    const handleSubmitEnrollHorse = (e) => {
        e.preventDefault();
        if (raceIdInput !== "" && horseIdInput !== "") {
            enrollHorse({
                variables: {
                    command: {
                        race: (raceIdInput),
                        horse: (horseIdInput)
                    }
                }
            })
            setEnrollHorseSuccess(true);
        } else {
            return
        }
    };

    return (
        // <SafeAreaView style={backgroundStyle}>
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            {/* Mutation - Enroll Horse */}

            <View style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
                <Section title="Mutation - Enroll Horse" isDarkMode={isDarkMode}>
                    Input Race ID and Horse ID to Enroll Horse.
                </Section>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={handleRaceIdInputChange}
                value={raceIdInput}
                placeholder="Enter Race ID"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={handleHorseIdInputChange}
                value={horseIdInput}
                placeholder="Enter Horse ID"
                keyboardType="default"
            />
            <Button title="Submit" onPress={handleSubmitEnrollHorse} />
        </ScrollView>
        // </SafeAreaView>
    );

};

export default EnrollHorse;