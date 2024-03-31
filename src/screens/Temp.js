import auth from '@react-native-firebase/auth';

auth()
  .createUserWithEmailAndPassword(
    'jane.doe@example.com',
    'SuperSecretPassword!',
  )
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });

const signup = async () => {
  try {
    const user = await auth().createUserWithEmailAndPassword(
      'jane.doe@example.com',
      'SuperSecretPassword!',
    );
    console.log(user)
    console.log('Registration Successful. Please Login to proceed');
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    } else {
      setErrortext(error.message);
    }
    console.log(error);
  }
};




import auth from '@react-native-firebase/auth';

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};












navigation.reset({
  index: 0,
  routes: [{name: 'Home'}],
});



if (!user.emailVerified) {
  Alert.alert(
    'Email Verification',
    'Please verify your email before signing in. Do you want to resend the verification email?',
    [
      {
        text: 'Resend',
        onPress: async () => {
          try {
            await user.sendEmailVerification();
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
    { cancelable: false }
  );
  return;
}