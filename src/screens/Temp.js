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












navigation.reset({
  index: 0,
  routes: [{name: 'Home'}],
});