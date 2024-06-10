import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BoxCard from '../components/BoxCard';
import colors from '../constants/globalstyles';

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <BoxCard
          text={'Add\nStudent'}
          navigate={() => navigation.navigate('AddStudent', {menuItem: '1'})}
        />
        <BoxCard
          text={'Mark\nAttendence'}
          navigate={() =>
            navigation.navigate('ClassSelection', {menuItem: '2'})
          }
        />
        <BoxCard
          text={'Exam\nDetails'}
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
        <TouchableOpacity style={styles.logoutBtn}>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    backgroundColor: colors.secondary,
  },

  logoutBtn:{
    backgroundColor: colors.dark,
    borderColor: colors.dark,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 10,
  },

  logoutTxt:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 10,
    color: colors.white,
  }
});
