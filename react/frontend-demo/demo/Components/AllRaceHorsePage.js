import { React, useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native';
import CustomDataTable from './CustomDataTable';
import { useQuery, useReactiveVar } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
    allRaceQuery,
    allHorseQuery
} from '../graphql/query';
import { horseListVar } from '../localState';

const AllRaceHorsePage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    
    const [raceDataResult, setRaceDataResult] = useState([]);
    const [horseDataResult, setHorseDataResult] = useState([]);

    //////////// Queries ///////////////
    const { loading: raceDataLoading, data: raceData, error: raceDataErr } = useQuery(allRaceQuery);
    const { loading: horseDataLoading, data: horseData, error: horseDataErr, refetch } = useQuery(allHorseQuery);

    const raceTableTitles = [
        "Race ID",
        "Race No.",
        "Start Time",
        "Venue"
    ];

    const horseTableTitles = [
        "Horse ID",
        "Horse Name",
        "Horse Rank"
    ];

    useEffect(() => {
        horseListVar(horseData)
    }), [horseData]


    //All Race
    useEffect(() => {
        if (!raceDataLoading && raceData && raceData.races.length > 0) {
            const data = raceData.races;
            const dataFix = data.map(obj => {
                const { [Object.keys(obj)[0]]: _, ...rest } = obj;
                return rest;
            });
            setRaceDataResult(dataFix);
        }
    }, [raceData]);
    
    //All Horse
    useEffect(() => {
        if (!horseDataLoading && horseData && horseData.horses.length > 0) {
            const dataHorse = horseData.horses;
            const dataHorseFix = dataHorse.map(obj => {
                const { [Object.keys(obj)[3]]: _, ...rest } = obj;
                return rest;
            });
            setHorseDataResult(dataHorseFix);
        }
    }, [horseData]);

    const horseListInit = useReactiveVar(horseListVar);
    console.log(horseListInit, 'CACHE_LIST')

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
        >
            {/* // Query - All Races */}
            <View
                style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                <Section title="Query - All Races" isDarkMode={isDarkMode}>
                    Details of all races.
                </Section>
            </View>
            {raceData && raceData.races.length > 0 ? (
                <CustomDataTable tableTitles={raceTableTitles} tableData={raceDataResult} />
            ) : ""}

            {
                raceDataErr && raceDataErr.message !== '' ?
                    <Text>{raceDataErr.message}</Text>
                    :
                    ""
            }

            {/* Query - All Horses */}

            <View
                style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                <Section title="Query - All Horses" isDarkMode={isDarkMode}>
                    Details of all horses.
                </Section>
            </View>
            {horseDataResult && horseDataResult.length > 0 ? (
                <CustomDataTable tableTitles={horseTableTitles} tableData={horseDataResult} type='horse' />
            ) : ""}
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

export default AllRaceHorsePage;