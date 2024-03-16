import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Card from '../components/card';
import colors from '../constants/globalstyles';

const Home = ({navigation}) => {
  return (
    <View style = {{flex:1}}>
        <View style={styles.container}>
        <Card text={'Add\nStudent'} navigate = {()=>navigation.navigate("AddStudent")}/>
        <Card text={'Mark\nAttendence'} navigate={()=>navigation.navigate("MarkAttendence")}/>
        <Card text={'Exam\nDetails'} navigate={()=>navigation.navigate("ExamDetails")}/>
        </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection:"row",
        justifyContent:"space-around",
        flexWrap:"wrap",
        backgroundColor: colors.secondary,
      },
})