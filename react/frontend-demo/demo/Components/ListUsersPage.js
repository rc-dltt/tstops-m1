import {React, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import {useQuery} from '@apollo/client';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {usersQuery} from '../graphql/users/query';
import {UserFeed} from './UserFeed';

const ListUsersPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //////////// Queries ///////////////
  const {loading: dataLoading, data: data, error: err} = useQuery(usersQuery);

  // Query Init States
  const [dataResult, setDataResult] = useState([]);

  // Users
  useEffect(() => {
    if (!dataLoading && data && data.users.length > 0) {
      setDataResult(data.users);
    }
  }, []);

  console.log(err, 'err');

  //////////////////////////////// Event Handlers //////////////////////////////////

  // Users Query
  const TableUsers = () => {
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Is Admin</DataTable.Title>
        </DataTable.Header>

        {dataResult.length > 0
          ? dataResult.map((item, i) => {
              return (
                <DataTable.Row key={i}>
                  <DataTable.Cell>{item.id}</DataTable.Cell>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell>{item.email}</DataTable.Cell>
                  <DataTable.Cell>{item.roles.includes('admin').toString()}</DataTable.Cell>
                </DataTable.Row>
              );
            })
          : ''}
      </DataTable>
    );
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <SafeAreaView
    // // style={backgroundStyle}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        // style={backgroundStyle}
      >
        {/* // Query - Users */}
        {/* <UserFeed>user feed</UserFeed> */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Query - Users" isDarkMode={isDarkMode}>
            Details of all users.
          </Section>
        </View>
        <TableUsers />
      </ScrollView>
    </SafeAreaView>
  );
};

const Section = props => {
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
  },
});

export default ListUsersPage;
