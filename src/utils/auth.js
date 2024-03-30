import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

export const signupAuth = async (name, email, password) => {
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password);

    console.log('Registration Successful. Please Login to proceed');
  
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
    console.log(error);
    throw error;
  }
};
