import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import { exportToFirebase } from './firestoreServices';

export const signupAuth = async (name, email, password) => {
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password);

    if (user) {
      await auth().currentUser.updateProfile({displayName: name});
      await auth().currentUser.sendEmailVerification();
      Alert.alert(
        'EMAIL VERIFICATION',
        'Please verify your email address. An email has been sent to ' + email,
      );

      return user;
    }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('ERROR', 'That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      Alert.alert('ERROR', 'That email address is invalid!');
    }else{
      Alert.alert('Error', error.message);
    }
  }
};

export const loginAuth = async (email, password) => {
  try {
    const user = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const varifivationStatus = await auth().currentUser.emailVerified;
    if (!varifivationStatus) {
      Alert.alert(
        'Email Verification',
        'Please verify your email before signing in. Do you want to resend the verification email?',
        [
          {
            text: 'RESEND',
            onPress: async () => {
              try {
                await auth().currentUser.sendEmailVerification();
                Alert.alert('Email Sent', 'Please check your email for verification.');
              } catch (error) {
                Alert.alert('Error', error.message);
              }
            },
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        { cancelable: true }      
        );
        return false;
    }

    return user;
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      Alert.alert('ERROR', 'That email address is invalid!');
    } else if (error.code === 'auth/invalid-credential') {
      Alert.alert('ERROR', 'The credentials are incorrect, malformed or doesn\'t exist!');
    }else{
      Alert.alert('Error', error.message);
    }
  }
};


export const addingClasses = async (uId) => {
  try {
    const availableClasses = [
    {userId: uId, class: '9th', board: 'Federal Board'},
    {userId: uId, class: '10th', board: 'Federal Board'},
    {userId: uId, class: '11th', board: 'Federal Board'},
    {userId: uId, class: '12th', board: 'Federal Board'},
    {userId: uId, class: '9th', board: 'Sindh Board'},
    {userId: uId, class: '10th', board: 'Sindh Board'},
    {userId: uId, class: '11th', board: 'Sindh Board'},
    {userId: uId, class: '12th', board: 'Sindh Board'},
  ];
    await exportToFirebase('classes', availableClasses[0]);
    await exportToFirebase('classes', availableClasses[1]);
    await exportToFirebase('classes', availableClasses[2]);
    await exportToFirebase('classes', availableClasses[3]);
    await exportToFirebase('classes', availableClasses[4]);
    await exportToFirebase('classes', availableClasses[5]);
    await exportToFirebase('classes', availableClasses[6]);
    await exportToFirebase('classes', availableClasses[7]);
  } catch (error) {

    Alert.alert('Error', error.message);
  }
};
