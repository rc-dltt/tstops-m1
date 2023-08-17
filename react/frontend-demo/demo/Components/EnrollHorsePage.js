import { React, useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    View,
    TextInput,
    Button,
    useColorScheme
} from 'react-native';
import { useMutation } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { enrollHorseMutation } from '../graphql/mutation';

const EnrollHorse = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

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

export default EnrollHorse;