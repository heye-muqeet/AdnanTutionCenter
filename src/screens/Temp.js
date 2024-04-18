import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { exportToFirebase } from '../utils/firestoreServices';
import firestore from '@react-native-firebase/firestore';

const Temp = () => {
  const [studentsData, setStudentsData] = useState('');

  const getData = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('userId');
      const querySnapshot = await firestore()
        .collection('classes')
        .where('board', '==', 'Federal Board')
        .where('class', '==', '9th')
        .where('userId', '==', currentUser)
        .get();

      let tempStudentsData = '';

      querySnapshot.forEach(documentSnapshot => {
        const { id } = documentSnapshot.data();
        tempStudentsData = id;
      });

      return tempStudentsData;
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSubmit = async () => {
    const data = await getData();
    setStudentsData(data);
    console.log(studentsData);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleSubmit}>
        <Text>hit me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Temp;
