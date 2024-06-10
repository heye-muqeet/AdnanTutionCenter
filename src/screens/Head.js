import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import colors from '../constants/globalstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Head = ({navigation}) => {
  const initialRoute = async() =>
    {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log("dataaaaa",userId)
        if(userId) navigation.navigate("Home")
        else navigation.navigate("Head")
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      initialRoute()
    },[])
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.uperContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/icons/atc.png')}></Image>
        <Text style={styles.motoTxt}> learn today, lead </Text>
        <Text style={styles.motoTxt}> tomorrow </Text>
      </View>
      <View style={styles.lowerContainer}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupBtn}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={styles.btnTxt}>Sign Up</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default Head;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },

  uperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.6,
  },

  logo: {
    marginTop: 50,
    height: 220,
    width: 220,
  },

  motoTxt: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
    fontStyle: 'italic',
  },

  lowerContainer: {
    flex: 0.4,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginBtn: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
    borderWidth: 1,
    width: '70%',
    borderRadius: 15,
    marginBottom: 10,
  },

  signupBtn: {
    borderColor: colors.dark,
    borderWidth: 1,
    width: '70%',
    borderRadius: 15,
  },

  btnTxt: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    paddingVertical: 15,
    color: colors.white,
  },
});
