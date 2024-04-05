import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

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

      console.log(user);
      return user;
    }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('ERROR', 'That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      Alert.alert('ERROR', 'That email address is invalid!');
      console.log(error);
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
    console.log(varifivationStatus)
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
    console.log(error);
    if (error.code === 'auth/invalid-email') {
      Alert.alert('ERROR', 'That email address is invalid!');
    } else if (error.code === 'auth/invalid-credential') {
      Alert.alert('ERROR', 'The credentials are incorrect, malformed or doesn\'t exist!');
    }else{
      Alert.alert('Error', error.message);
    }
  }
};
