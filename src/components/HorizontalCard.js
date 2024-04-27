import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../constants/globalstyles';

const HorizontalCard = ({imgSrc, text, navigate}) => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={navigate}>
        <Image source={imgSrc} alt='ImageNotFound' style={styles.cardImage} />
        <Text style={styles.cardText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 100,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },

  cardImage: {
    width: 100,
    height: 100, 
    padding: 20,
  },

  cardText: {
    fontSize: 22,
    color: colors.secondary,
    textAlign: 'center',
    padding: 20,
    fontWeight: '700',
  },
});
