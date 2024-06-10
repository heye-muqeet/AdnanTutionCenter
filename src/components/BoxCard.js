import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../constants/globalstyles'

const BoxCard = ({text, navigate}) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={navigate}>
        <Text style={styles.content}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};


export default BoxCard

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.primary,
        borderRadius: 8,
        // elevation: 3,
        // shadowColor: colors.dark,
        // // shadowOffset: {width: 5, height: 5},
        // // shadowOpacity: 0.5,
        // // shadowRadius: 50,
        // marginHorizontal: 4,
        // marginVertical: 6,
        // width: 100,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10 
      },
    
      content: {
        fontSize: 20,
        color: colors.secondary,
        textAlign: 'center',
        // padding: 20,
        fontWeight: 'bold',
      },
})