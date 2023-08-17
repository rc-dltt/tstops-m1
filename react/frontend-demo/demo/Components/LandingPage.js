import { React, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    Text
} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AllRaceHorsePage from './AllRaceHorsePage';
import AddRacePage from './AddRacePage';
import AddHorsePage from './AddHorsePage';
import EnrollHorsePage from './EnrollHorsePage';

import RegisterPage from './RegisterPage';
import ListUsersPage from './ListUsersPage';



const LandingPage = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'allRaceHorse', title: 'All Races/Horses' },
        { key: 'addRace', title: 'Add Race'},
        { key: 'addHorse', title: 'Add Horse'},
        { key: 'enrollHorse', title: 'Enroll Horse' },

        { key: 'listUsers', title: 'List Users' },
        { key: 'registerUser', title: 'Register User' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
      allRaceHorse: AllRaceHorsePage,
      addRace: AddRacePage,
      addHorse: AddHorsePage,
      enrollHorse: EnrollHorsePage,
      listUsers: ListUsersPage,
      registerUser: RegisterPage,
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return (         
                <BottomNavigation
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
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