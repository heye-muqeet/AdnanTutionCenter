import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import uuid from 'react-native-uuid';

export const exportToFirebase = async (collection, document) => {
  try {
    const id = uuid.v4();
    const res = await firestore()
      .collection(collection)
      .doc(id)
      .set({...document, id});
    return id;
  } catch (error) {
    Alert.alert('Error', error.message);
    throw error;
  }
};

export const getClass = async (board, grade) => {
  try {
    const currentUser = await AsyncStorage.getItem('userId');

    const querySnapshot = await firestore()
      .collection('classes')
      .where('board', '==', board)
      .where('class', '==', grade)
      .where('userId', '==', currentUser)
      .get();

    let tempGrade = '';
    querySnapshot.forEach(documentSnapshot => {
      const {id} = documentSnapshot.data();
      tempGrade = id;
    });
    return tempGrade;
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

export const getStudents = async gradeId => {
  try {
    const currentUser = await AsyncStorage.getItem('userId');
    const querySnapshot = await firestore()
      .collection('students')
      .where('cid', '==', gradeId)
      .where('userId', '==', currentUser)
      .get();

    let StudentsData = [];

    querySnapshot.forEach(documentSnapshot => {
      const {id, name} = documentSnapshot.data();
      const student = {id, name};
      StudentsData.push(student);
    });
    return StudentsData;
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

export const getAttendenceLog = async gradeId => {
  try {
    const currentUser = await AsyncStorage.getItem('userId');
    const querySnapshot = await firestore()
      .collection('attendenceLog')
      .where('cid', '==', gradeId)
      .where('userId', '==', currentUser)
      .get();

    let attendenceLogData = [];

    querySnapshot.forEach(documentSnapshot => {
      const {id, date, topic} = documentSnapshot.data();
      const AttendenceLog = {id, date, topic};
      attendenceLogData.push(AttendenceLog);
    });
    return attendenceLogData;
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

export const getStudent = async stdId => {
  try {
    const querySnapshot = await firestore()
      .collection('students')
      .doc(stdId)
      .get();
    // console.log(querySnapshot.data())
    return querySnapshot.data()
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

export const getAttendenceByLog = async attendanceLogId => {
  const querySnapshot = await firestore()
    .collection('attendence')
    .where('attendanceId', '==', attendanceLogId)
    .get();

  const attendenceData = [];

  querySnapshot.forEach(doc => {
    attendenceData.push(doc.data());
  });

  // console.log(attendenceData)
  return attendenceData;
};

export const getAttendenceStudent = async studentId => {};
