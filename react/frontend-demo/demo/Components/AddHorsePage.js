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
import { addHorseMutation } from './mutation';

const AddHorsePage = () => {

    ////////// Mutations //////////////
    const [addHorse] = useMutation(addHorseMutation);

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
    const handleSubmitAddHorse = (e) => {
        e.preventDefault();
        if (horseNameInput !== "" && horseRankInput !== "") {
            addHorse({
                variables: {
                    command: {
                        name: (horseNameInput),
                        rank: Number(horseRankInput)
                    }
                }
            })
            setAddHorseSuccess(true);
        } else {
            return
        }
    };

    return (
        // <SafeAreaView style={backgroundStyle}>
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
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
            <Button title="Submit" onPress={handleSubmitAddHorse} />
        {/* // </SafeAreaView> */}
        </ScrollView>
    );

};

export default AddHorsePage;