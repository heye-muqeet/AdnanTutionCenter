import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
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

export const getClass = async(board, grade) => {
  try {
    const currentUser =await AsyncStorage.getItem('userId');

        const querySnapshot = await firestore()
        .collection('classes')
        .where('board', '==', board)
        .where('class', '==', grade)
        .where('userId', '==', currentUser)
        .get();

        let tempGrade = '';
        querySnapshot.forEach(documentSnapshot => {
          const {id}  = documentSnapshot.data();
          tempGrade = id;
        });
        return tempGrade;
  } catch (error) {
    Alert.alert('Error', error.message);
  }
} 

export const getStudents = async (gradeId) => {
  try {
    const currentUser = await AsyncStorage.getItem('userId');
    const querySnapshot = await firestore()
      .collection('students')
      .where('cid', '==', gradeId)
      .where('userId', '==', currentUser)
      .get();

    let tempStudentsData = [];

    querySnapshot.forEach(documentSnapshot => {
      const {id, name} = documentSnapshot.data();
      const student = {id, name};
      tempStudentsData.push(student);
    });
    return tempStudentsData;
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};



