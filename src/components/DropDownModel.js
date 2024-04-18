import { View, TextInput, Button, StyleSheet, Modal, FlatList, TouchableOpacity, Text } from 'react-native';
import React from 'react'
import colors from '../constants/globalstyles';

const DropDownModel = ({data, setValue, visible, setVisible, id, name}) => {

  const renderDataItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dataItem}
      onPress={() => {
        setValue(item[name]);
        setVisible(false);
      }}
    >
      <Text style={styles.item}>{item[name]}</Text>
    </TouchableOpacity>
  );
  return (
    <Modal
    animationType = "slide"
    transparent={true}
    visible={visible}
    onRequestClose={() => setVisible(false)}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <FlatList
          data={data}
          renderItem={renderDataItem}
          keyExtractor={item => item[id]}
        />
      </View>
    </View>
  </Modal>
  )
}

export default DropDownModel

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  modalView: {
    borderWidth: 0.4,
    margin: 20,
    backgroundColor: colors.white,
    width:300,
    borderRadius: 20,
    padding: 35,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dataItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  item:{
    color: colors.black,
  }
})