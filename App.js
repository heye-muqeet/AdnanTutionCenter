import * as React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import AddStudent from './src/screens/AddStudent'
import colors from './src/constants/globalstyles';
import MarkAttendence from './src/screens/MarkAttendence';
import ExamDetails from './src/screens/ExamDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={styles.navigationBar}>
        <Stack.Screen options={{title: "Adnan Tution Center"}} name="Home" component={Home} />
        <Stack.Screen options={{title: "Add Student"}} name="AddStudent" component={AddStudent} />
        <Stack.Screen options={{title: "Mark Attendence"}}name = "MarkAttendence" component={MarkAttendence}/>
        <Stack.Screen options={{title: "Exam Details"}}name = "ExamDetails" component={ExamDetails}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  navigationBar:{
    headerStyle: {backgroundColor: colors.primary},
    headerTitleStyle: {fontWeight: 'bold'},
    navigationBarColor: colors.primary,
    statusBarColor: colors.primary,
    headerTintColor: colors.secondary,
    headerTitleAlign: "center",
  }
})