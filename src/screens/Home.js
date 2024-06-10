import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BoxCard from '../components/BoxCard';
import colors from '../constants/globalstyles';
import {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('userId');
      navigation.navigate('Head');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <BoxCard
          text={'Add Student'}
          navigate={() => navigation.navigate('AddStudent', {menuItem: '1'})}
        />
        <BoxCard
          text={'Mark Attendence'}
          navigate={() =>
            navigation.navigate('ClassSelection', {menuItem: '2'})
          }
        />
        <BoxCard
          text={'Exam Details'}
          navigate={() =>
            navigation.navigate('ClassSelection', {menuItem: '3'})
          }
        />
        <BoxCard
          text={'Students'}
          navigate={() =>
            navigation.navigate('ClassSelection', {menuItem: '4'})
          }
        />
        <BoxCard
          text={'Attendence Log'}
          navigate={() =>
            navigation.navigate('ClassSelection', {menuItem: '5'})
          }
        />
        {/* <BoxCard
          text={'Temporary\nScreen'}
          navigate={() => navigation.navigate('Temp', {menuItem: '6'})}
        /> */}
      </View>
      <View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutTxt}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // flexWrap: 'wrap',
    backgroundColor: colors.secondary,
  },

  logoutBtn: {
    backgroundColor: colors.dark,
    // borderColor: colors.dark,
    borderWidth: 0.4,
    borderRadius: 15,
    // marginTop: 25,
    margin: 10,
    marginHorizontal: 20,
  },

  logoutTxt: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 10,
    color: colors.white,
  },
});
