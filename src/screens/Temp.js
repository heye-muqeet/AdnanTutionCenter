import {View, Text, TouchableOpacity, Alert, ToastAndroid} from 'react-native';
import React, {cloneElement, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {exportToFirebase} from '../utils/firestoreServices';
import firestore from '@react-native-firebase/firestore';
  
  const Temp = () => {
    const {studentsData, setSudentsData} =useState([])

    const getData = async () => {
  
      try {
        const currentUser =await AsyncStorage.getItem('userId');
        const querySnapshot = await firestore()
        .collection('students')
        .where('board', '==', 'Federal Board')
        .where('class', '==', '9th')
        .where('userId', '==', currentUser)
        .get();

        let tempStudentsData = [];

        querySnapshot.forEach(documentSnapshot => {
          const { id, name } = documentSnapshot.data();
          const student = { id, name };
          tempStudentsData.push(student);
        });
        } catch (error) {
          Alert.alert('Error', error.message);
        }
      };

    useEffect(() => {
    getData();
  }, []);
  

  return (
    <View>
      {/* {
        studentsData.map(student => { })
      } */}
    </View>
  );
};

export default Temp;
