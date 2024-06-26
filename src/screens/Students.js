import React, { useEffect, useState } from 'react'; 
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import colors from '../constants/globalstyles';
import { getClass, getStudents } from '../utils/firestoreServices';

const Students = ({ route }) => {
  const { board, grade } = route.params;
  const [studentsData, setStudentsData] = useState([]);

  const getData = async() => {
    const gradeId = await getClass(board, grade); 
    setStudentsData(await getStudents(gradeId))
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainHeading}>Students</Text>

      {studentsData.map(student => (
        <View key={student.id} style={styles.subContainer}>
          <View style={styles.mainView}>
            <View style={styles.studentNameContainer}>
              <Text style={styles.stdName}>{student.name}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Students;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.secondary,
  },
  
  subContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderWidth: 0.1,
    borderRadius: 30,
    marginVertical: 3,
  },

  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  mainHeading: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  studentNameContainer: {
    alignSelf: 'center',
    width: '50%',
  },

  stdName: {
    color: colors.black,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
