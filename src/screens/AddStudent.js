import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../constants/globalstyles';

const AddStudent = () => {
  const [stdName, setName] = useState();
  const [stdClass, setClass] = useState();
  const [stdBoard, setBoard] = useState();
  const [stdPhone, setPhone] = useState();
  const [stdEmail, setEmail] = useState();
  const [userData, setUserData] = useState({
    stdName: '',
    stdClass: '',
    stdBoard: '',
    stdPhone: '',
    stdEmail: '',
  });

    // setFormData(prevState => ({...prevState,[key]: value}));

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>New Student Form</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Student Name"
        placeholderTextColor={'grey'}
        onChangeText={(text)=>setName(text)}
        value={stdName}
      />

      <Text style={styles.label}>Class</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Class"
        placeholderTextColor={'grey'}
        onChangeText={(text)=>setClass(text)}
        value={stdClass}
      />

      <Text style={styles.label}>Board</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Board"
        placeholderTextColor={'grey'}
        onChangeText={(text)=>setBoard(text)}
        value={stdBoard}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Phone Number"
        placeholderTextColor={'grey'}
        onChangeText={(text)=>setPhone(text)}
        value={stdPhone}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Email"
        placeholderTextColor={'grey'}
        onChangeText={(text)=>setEmail(text)}
        value={stdEmail}
      />

      <TouchableOpacity style={styles.btn} onPress={()=>{
        const data = {
          stdName, stdClass, stdBoard, stdPhone, stdEmail
        };
        console.log(data);
        // Alert.alert('Student Added', 'Student successfully added!');
        ToastAndroid.show("Student Successfully Added!", ToastAndroid.SHORT);
      }}>
        <Text style={styles.btntxt}>Add Student</Text>
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
