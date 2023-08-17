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
import { addHorseMutation } from '../graphql/mutation';

const AddHorsePage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

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