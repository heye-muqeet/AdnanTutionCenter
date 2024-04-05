import {
  ActivityIndicator,
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../constants/globalstyles';
import {loginAuth} from '../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmit = async () => {
    if (!email) return Alert.alert('REQUIRED', 'Please fill Email');
    if (!password) return Alert.alert('REQUIRED', 'Please fill Password');

    setLoader(true);
    try {
      const user = await loginAuth(email, password);
      const data = {email, password};
      console.log(data);
      setLoader(false);
      if (user) {
        await AsyncStorage.setItem('userId', user.user.uid)
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.uperContainer}>
        <View style={styles.backContainer}>
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={() => {
              navigation.navigate('Head');
            }}>
            <Image
              style={styles.backIcon}
              source={require('../assets/icons/back.png')}></Image>
            <Text style={styles.backTxt}>Back</Text>
          </TouchableOpacity>
          <View style={styles.loginTxtContainer}>
            <Text style={styles.loginTxt}>Login</Text>
          </View>
        </View>
      </View>

      <View style={styles.lowerContainer}>
        <Text style={styles.mainHeading}>Login</Text>
        <Text style={styles.smallTxt}>Sign in to continue. </Text>

        <View style={styles.LowerinnerContainer}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Email"
            placeholderTextColor={'#89C2D6'}
            onChangeText={text => {
              setEmail(text);
            }}
            value={email}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor={'#89C2D6'}
            onChangeText={text => {
              setPassword(text);
            }}
            value={password}
          />

          <TouchableOpacity
            style={styles.signupBtn}
            disabled={loader}
            onPress={handleSubmit}>
            {loader ? (
              <ActivityIndicator
                style={styles.btnTxt}
                size={27}
                color={colors.white}
              />
            ) : (
              <Text style={styles.btnTxt}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.footerTxt}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={[styles.footerTxt]}>Signup !</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },

  uperContainer: {
    backgroundColor: colors.secondary,
    flex: 0.3,
  },

  backContainer: {
    backgroundColor: colors.dark,
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingLeft: 30,
    position: 'absolute',
    top: -10,
    left: -35,
  },

  backIconContainer: {
    flexDirection: 'row',
  },

  backIcon: {
    alignSelf: 'center',
    height: 15,
    width: 20,
  },

  backTxt: {
    color: colors.secondary,
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: '700',
  },

  loginTxtContainer: {
    margin: 4,
  },

  loginTxt: {
    paddingTop: 2,
    color: colors.secondary,
    fontSize: 25,
    fontWeight: '700',
  },

  lowerContainer: {
    flex: 0.7,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },

  mainHeading: {
    marginTop: '10%',
    fontSize: 40,
    color: colors.white,
    fontWeight: '700',
  },

  smallTxt: {
    color: colors.white,
    paddingTop: 5,
    fontSize: 10.5,
  },

  LowerinnerContainer: {
    marginTop: '3%',
    width: '70%',
  },

  label: {
    marginTop: '7%',
    marginBottom: '3%',
    color: colors.white,
    fontWeight: 'bold',
  },

  textInput: {
    color: colors.white,
    backgroundColor: '#6290A0',
    borderRadius: 15,
    paddingLeft: 15,
  },

  signupBtn: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: '10%',
    marginBottom: 10,
  },

  btnTxt: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 10,
    color: colors.white,
  },

  footerTxt: {
    marginTop: '2%',
    color: colors.white,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
