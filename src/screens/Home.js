import {StyleSheet, Text, View} from 'react-native';
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
          navigate={() => navigation.navigate('ClassSelection' , {menuItem: '2'})}
        />
        <BoxCard
          text={'Exam\nDetails'}
          navigate={() => navigation.navigate('ClassSelection', {menuItem: '3'})}
        />
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
});