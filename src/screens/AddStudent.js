import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../constants/globalstyles';

const AddStudent = ({route}) => {
  const [stdName, setName] = useState('');
  const [stdClass, setClass] = useState('');
  const [stdBoard, setBoard] = useState('');
  const [stdPhone, setPhone] = useState('');
  const [stdEmail, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const {menuItem} = route.params;

  console.log(menuItem);

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>New Student Form</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Student Name"
        placeholderTextColor={'grey'}
        onChangeText={text => setName(text)}
        value={stdName}
      />

      <Text style={styles.label}>Class</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Class"
        placeholderTextColor={'grey'}
        onChangeText={text => setClass(text)}
        value={stdClass}
      />

      <Text style={styles.label}>Board</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Board"
        placeholderTextColor={'grey'}
        onChangeText={text => setBoard(text)}
        value={stdBoard}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Phone Number"
        placeholderTextColor={'grey'}
        onChangeText={text => setPhone(text)}
        value={stdPhone}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Email"
        placeholderTextColor={'grey'}
        onChangeText={text => setEmail(text)}
        value={stdEmail}
      />

      <TouchableOpacity
        style={styles.btn}
        disabled={loader}
        onPress={() => {
          if (stdName != '') {
            setLoader(true);
            setTimeout(() => {
              setLoader(false);
              const data = {
                stdName,
                stdClass,
                stdBoard,
                stdPhone,
                stdEmail,
              };
              console.log(data);
              setName('');
              setClass('');
              setBoard('');
              setPhone('');
              setEmail('');
              ToastAndroid.showWithGravity(
                'Student Successfully Added!',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
              );
            }, 2000);
          } else {
            Alert.alert('Error', 'Name should not be empty!');
          }
        }}>
        {loader ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.btntxt}>Add Student</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddStudent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.secondary,
  },

  mainHeading: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  label: {
    marginHorizontal: 20,
    marginVertical: 10,
    color: colors.black,
    fontWeight: 'bold',
  },

  textInput: {
    marginHorizontal: 10,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingLeft: 15,
    borderWidth: 0.3,
    // textopacity: 0.2,
  },

  btn: {
    backgroundColor: colors.primary,
    width: '40%',
    marginTop: 40,
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },

  btntxt: {
    fontWeight: 'bold',
    color: colors.secondary,
    alignSelf: 'center',
  },
});
