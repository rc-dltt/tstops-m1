import { React, useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    useColorScheme,
    ScrollView,
    View,
    TextInput,
    Button,
    Text
} from 'react-native';
import { useMutation } from '@apollo/client';
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