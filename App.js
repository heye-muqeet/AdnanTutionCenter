import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import AddStudent from './src/screens/AddStudent';
import colors from './src/constants/globalstyles';
import MarkAttendence from './src/screens/MarkAttendence';
import ExamMarks from './src/screens/ExamMarks';
import ClassSelection from './src/screens/ClassSelection';
import NewExam from './src/screens/NewExam';
import Head from './src/screens/Head';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Head"
        screenOptions={styles.navigationBar}>
        <Stack.Screen
          options={{
            headerShown: false,
            statusBarColor: colors.secondary,
            statusBarStyle: 'dark',
          }}
          name="Head"
          component={Head}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            statusBarColor: colors.secondary,
            statusBarStyle: 'dark',
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            statusBarColor: colors.secondary,
            statusBarStyle: 'dark',
          }}
          name="Signup"
          component={Signup}
        />
        <Stack.Screen
          options={{title: 'Adnan Tution Center'}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{title: 'Add Student'}}
          name="AddStudent"
          component={AddStudent}
        />
        <Stack.Screen
          options={{title: 'Mark Attendence'}}
          name="MarkAttendence"
          component={MarkAttendence}
        />
        <Stack.Screen
          options={{title: 'Exam Marks'}}
          name="ExamMarks"
          component={ExamMarks}
        />
        <Stack.Screen
          options={{title: 'Select Class'}}
          name="ClassSelection"
          component={ClassSelection}
        />
        <Stack.Screen
          options={{title: 'New Exam'}}
          name="NewExam"
          component={NewExam}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  navigationBar: {
    headerStyle: {backgroundColor: colors.primary},
    headerTitleStyle: {fontWeight: 'bold'},
    navigationBarColor: colors.primary,
    statusBarColor: colors.primary,
    headerTintColor: colors.secondary,
    headerTitleAlign: 'center',
  },
});
