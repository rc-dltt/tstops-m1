import { React, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme
} from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AllRaceHorsePage from './AllRaceHorsePage';
import AddRacePage from './AddRacePage';
import AddHorsePage from './AddHorsePage';
import EnrollHorse from './EnrollHorsePage';



const LandingPage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'allRaceHorse', title: 'All Races/Horses', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
        { key: 'addRace', title: 'Add Race', focusedIcon: 'album' },
        { key: 'addHorse', title: 'Add Horse', focusedIcon: 'history' },
        { key: 'enrollHorse', title: 'Enroll Horse', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        allRaceHorse: AllRaceHorsePage,
        addRace: AddRacePage,
        addHorse: AddHorsePage,
        enrollHorse: EnrollHorse,
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            {/* <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}> */}
                <BottomNavigation
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
            {/* </ScrollView> */}
        </SafeAreaView>
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