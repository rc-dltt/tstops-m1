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
import { DataTable, SegmentedButtons } from 'react-native-paper';
import { useQuery, useMutation } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
    allRaceQuery,
    allHorseQuery
} from './query';
import {
    addRaceMutation,
    addHorseMutation,
    enrollHorseMutation,
} from './mutation';

const LandingPage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [ tabValue, setTabValue ] = useState("addRace");

    //////////// Queries ///////////////
    const { loading: raceDataLoading, data: raceData, refetch: refetchRaces, error: allRaceErr } = useQuery(allRaceQuery);
    const { loading: horseDataLoading, data: horseData, refetch: refetchHorses, error: allHorseErr } = useQuery(allHorseQuery);

    // Query Init States
    const [raceDataResult, setRaceDataResult] = useState([]);
    const [horseDataResult, setHorseDataResult] = useState([]);

    ////////// Mutations //////////////
    const [addRace] = useMutation(addRaceMutation);
    const [addHorse] = useMutation(addHorseMutation);
    const [enrollHorse] = useMutation(enrollHorseMutation);

    // Mutation Init States
    const [raceNoInput, setRaceNoInput] = useState('');
    const [raceTimeInput, setRaceTimeInput] = useState('');
    const [raceVenueInput, setRaceVenueInput] = useState('');
    const [addRaceSuccess, setAddRaceSuccess] = useState(false);

    const [horseNameInput, setHorseNameInput] = useState('');
    const [horseRankInput, setHorseRankInput] = useState('');
    const [addHorseSuccess, setAddHorseSuccess] = useState(false);

    const [raceIdInput, setRaceIdInput] = useState('');
    const [horseIdInput, setHorseIdInput] = useState('');
    const [enrollHorseSuccess, setEnrollHorseSuccess] = useState(false);

    // All Race
    useEffect(() => {
        if (!raceDataLoading && raceData && raceData.races.length > 0) {
            setRaceDataResult(raceData.races);
        }
    }, [raceData]);

    // All Race Refetch
    useEffect(() => {
        if (addRaceSuccess || enrollHorseSuccess) {
            refetchRaces();
            if (addRaceSuccess) {
                addRaceRefetchSuccess();
            }
            if (enrollHorseSuccess) {
                enrollHorseRefetchSuccess();
            }
        }
    }, [addRaceSuccess, enrollHorseSuccess]);

    // All Horse
    useEffect(() => {
        if (!horseDataLoading && horseData && horseData.horses.length > 0) {
            setHorseDataResult(horseData.horses);
        }
    }, [horseData]);

    // All Horse Refetch
    useEffect(() => {
        if (addHorseSuccess) {
            refetchHorses();
            addHorseRefetchSuccess();
        }
    }, [addHorseSuccess]);

    //////////////////////////////// Event Handlers //////////////////////////////////

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

    // Add Horse Input Change
    const handleHorseNameInputChange = (input) => {
        setHorseNameInput(input);
    };
    const handleHorseRankInputChange = (input) => {
        setHorseRankInput(input);
    };

    // Eroll Horse Input Change
    const handleRaceIdInputChange = (input) => {
        setRaceIdInput(input);
    };
    const handleHorseIdInputChange = (input) => {
        setHorseIdInput(input);
    };

    // Data Refetch
    const addRaceRefetchSuccess = () => {
        setAddRaceSuccess(false)
    };
    const addHorseRefetchSuccess = () => {
        setAddHorseSuccess(false)
    };
    const enrollHorseRefetchSuccess = () => {
        setEnrollHorseSuccess(false)
    };

    // Races Query
    const TableRaces = () => {
        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Race ID</DataTable.Title>
                    <DataTable.Title >Race No.</DataTable.Title>
                    <DataTable.Title >Start Time</DataTable.Title>
                    <DataTable.Title >Venue</DataTable.Title>
                </DataTable.Header>

                {raceDataResult.length > 0 ? (
                    raceDataResult.map((item, i) => {
                        return (
                            <DataTable.Row key={i}>
                                <DataTable.Cell>{item.id}</DataTable.Cell>
                                <DataTable.Cell>{item.no}</DataTable.Cell>
                                <DataTable.Cell >{item.startTime}</DataTable.Cell>
                                <DataTable.Cell >{item.venue}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                ) : ""}
            </DataTable>
        );
    };

    // Horses Query
    const TableHorses = () => {
        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Horse ID</DataTable.Title>
                    <DataTable.Title >Horse Name</DataTable.Title>
                    <DataTable.Title >Horse Rank</DataTable.Title>
                </DataTable.Header>
                {horseDataResult.length > 0 ? (
                    horseDataResult.map((item, i) => {
                        return (
                            <DataTable.Row key={i}>
                                <DataTable.Cell>{item.id}</DataTable.Cell>
                                <DataTable.Cell>{item.name}</DataTable.Cell>
                                <DataTable.Cell >{item.rank}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                ) : ""}
            </DataTable>
        );
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <SegmentedButtons
                value={tabValue}
                onValueChange={setTabValue}
                buttons={[
                    {
                        value: 'addRace',
                        label: 'Add Race',
                    },
                    {
                        value: 'addHorse',
                        label: 'Add Horse',
                    },
                    {
                        value: 'enrollHorse',
                        label: 'Enroll Horse',
                    }
                ]}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>

                {/* Query - All Races */}
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Section title="Query - All Races" isDarkMode={isDarkMode}>
                        Details of all races.
                    </Section>
                </View>
                <TableRaces />

                {/* Query - All Horses */}

                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Section title="Query - All Horses" isDarkMode={isDarkMode}>
                        Details of all horses.
                    </Section>
                </View>
                <TableHorses />

                <View>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
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

export default LandingPage;