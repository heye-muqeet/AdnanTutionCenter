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
import {exportToFirebase, getClass} from '../utils/firestoreServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownModel from '../components/DropDownModel';

const availableClasses = [
  {id: '1', name: '9th'},
  {id: '2', name: '10th'},
  {id: '3', name: '11th'},
  {id: '4', name: '12th'},
];

const availableBoards = [
  {id: '1', name: 'Federal Board'},
  {id: '2', name: 'Sindh Board'},
  {id: '3', name: 'Agha Khan Board'},
];

const AddStudent = ({route}) => {
  const [stdName, setName] = useState('');
  const [stdClass, setClass] = useState('');
  const [stdBoard, setBoard] = useState('');
  const [stdPhone, setPhone] = useState('');
  const [stdEmail, setEmail] = useState('');
  const [classDropdownVisible, setClassDropdownVisible] = useState(false);
  const [boardDropdownVisible, setBoardDropdownVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const {menuItem} = route.params;

  const manageClasses = () => {
    setClassDropdownVisible(true);
  }

  const manageBoards = () => {
    setBoardDropdownVisible(true);
  }

  const handleSubmit = async () => {
    if (!stdName) return Alert.alert('REQUIRED', 'Please fill Student Name');
    if (!stdClass) return Alert.alert('REQUIRED', 'Please fill Student Class');
    if (!stdBoard) return Alert.alert('REQUIRED', 'Please fill Student Board');

    const gradeId = await getClass(stdBoard, stdClass);
    try {
      setLoader(true);
      const  studentData = {
        userId: await AsyncStorage.getItem('userId'),
        name: stdName,
        cid: gradeId,
        phone: stdPhone,
        email: stdEmail,
      };

      await exportToFirebase('students', studentData);
      setName('');
      setClass('');
      setBoard('');
      setPhone('');
      setEmail('');
      setLoader(false);
      ToastAndroid.showWithGravity(
        'Student Successfully Added!',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    } catch (error) {
      setLoader(false);
      Alert.alert('Error', error.message);
    }
  };

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
      <TouchableOpacity
        onPress={manageClasses}>
        <TextInput
          style={styles.textInput}
          placeholder="Select Class"
          editable={false}
          placeholderTextColor={'grey'}
          value={stdClass}
        />
      </TouchableOpacity>

      <DropDownModel
        data={availableClasses}
        setValue={setClass}
        visible={classDropdownVisible}
        setVisible={setClassDropdownVisible}
        id={"id"}
        name={"name"}
      />

      <Text style={styles.label}>Board</Text>
      <TouchableOpacity onPress={manageBoards}>
        <TextInput
          style={styles.textInput}
          placeholder="Select Board"
          placeholderTextColor={'grey'}
          editable={false}
          value={stdBoard}
        />
      </TouchableOpacity>

      <DropDownModel
        data={availableBoards}
        setValue={setBoard}
        visible={boardDropdownVisible}
        setVisible={setBoardDropdownVisible}
        id={"id"}
        name={"name"}
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
        onPress={handleSubmit}>
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
    color: colors.primary,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: "700",
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
