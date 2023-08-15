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
import { addRaceMutation } from './mutation';

const AddRacePage = () => {

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

    // Submit - Add Race
    const handleSubmitAddRace = (e) => {
        e.preventDefault();
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
        // <SafeAreaView style={backgroundStyle}>
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
        <Button title="Submit" onPress={handleSubmitAddRace} />
        </ScrollView>
        // </SafeAreaView>
    );

};

export default AddRacePage;