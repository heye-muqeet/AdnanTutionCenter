import {
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

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <View style={styles.signupTxtContainer}>
            <Text style={styles.signupTxt}>Sign Up</Text>
          </View>
        </View>
      </View>

      <View style={styles.lowerContainer}>
        <Text style={styles.mainHeading}>Create new</Text>
        <Text style={styles.mainHeading}>Account</Text>
        <View style={styles.lowerUpperContainer}>
          <Text style={styles.smallTxt}>Already Registered? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={[styles.smallTxt, styles.txtDecoration]}>
              Login here.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lowerLowerContainer}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Name"
            placeholderTextColor={'#89C2D6'}
            onChange={text => {
              setName(text);
            }}
            value={name}
          />

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Your Email"
            placeholderTextColor={'#89C2D6'}
            onChange={text => {
              setEmail(text);
            }}
            value={email}
          />

          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Password"
            placeholderTextColor={'#89C2D6'}
            onChange={text => {
              setPassword(text);
            }}
            value={password}
          />

          <TouchableOpacity style={styles.signupBtn} onPress={() => {
            const data = {name, email, password};
            console.log(data);
          }}>
            <Text style={styles.btnTxt}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerTxt}>Already Have Account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={[styles.footerTxt, styles.txtDecoration]}>Login !</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },

  uperContainer: {
    backgroundColor: colors.secondary,
    flex: 0.25,
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

  signupTxtContainer: {
    margin: 4,
  },

  signupTxt: {
    paddingTop: 2,
    color: colors.secondary,
    fontSize: 25,
    fontWeight: '700',
  },

  lowerContainer: {
    flex: 0.75,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainHeading: {
    fontSize: 30,
    color: colors.white,
    fontWeight: '700',
  },

  lowerUpperContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
  },

  smallTxt: {
    color: colors.white,
    fontSize: 10.5,
  },

  lowerLowerContainer: {
    width: '70%',
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
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
    marginTop: 25,
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
    color: colors.white,
    fontSize: 12,
  },

  txtDecoration: {
    textDecorationLine: 'underline',
  },
});