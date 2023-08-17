import { React } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native';
import CustomDataTable from './CustomDataTable';
import { useQuery } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    allRaceQuery,
    allHorseQuery
} from '../graphql/query';

const AllRaceHorsePage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    //////////// Queries ///////////////
    const { loading: raceDataLoading, data: raceData, error: raceDataErr } = useQuery(allRaceQuery);
    const { loading: horseDataLoading, data: horseData, error: horseDataErr } = useQuery(allHorseQuery);


    // Query Init States
    // const [raceDataResult, setRaceDataResult] = useState([]);
    // const [horseDataResult, setHorseDataResult] = useState([]);

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
    // All Race
    // useEffect(() => {
    //     if (!raceDataLoading && raceData && raceData.races.length > 0) {
    //         console.log(raceData, 'data');
    //         setRaceDataResult(raceData.races);
    //     }
    // }, []);

    // All Horse
    // useEffect(() => {
    //     if (!horseDataLoading && horseData && horseData.horses.length > 0) {
    //         setHorseDataResult(horseData.horses);
    //     }
    // }, [horseData]);

    const getTk = AsyncStorage.getItem('token');
    console.log(getTk, 'token');

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
        // style={backgroundStyle}
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
                <CustomDataTable tableTitles={raceTableTitles} tableData={raceData.races} />
            ) : ""}

            {/* Query - All Horses */}

            <View
                style={{
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                }}>
                <Section title="Query - All Horses" isDarkMode={isDarkMode}>
                    Details of all horses.
                </Section>
            </View>
            {horseData && horseData.horses.length > 0 ? (
                <CustomDataTable tableTitles={horseTableTitles} tableData={horseData.horses} />
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