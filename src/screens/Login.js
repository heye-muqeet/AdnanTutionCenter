import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import colors from '../constants/globalstyles';
const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.uperContainer}>
        <View style={styles.backContainer}>
          <TouchableOpacity style={styles.backIconContainer} onPress={()=>{navigation.navigate('Head');}}>
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
        
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },

  uperContainer: {
    backgroundColor: colors.secondary,
    flex: 0.3,
  },

  backContainer:{
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
    height: 16,
    width: 20,
    alignSelf: 'center',
  },

  backTxt:{
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
    justifyContent: 'center',
  },
})