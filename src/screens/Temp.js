import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import DropDownModel from '../components/DropDownModel';

const grades = [
  {id: '1', name: 'Grade 1'},
  {id: '2', name: 'Grade 2'},
  {id: '3', name: 'Grade 3'},
  {id: '4', name: 'Grade 4'},
  {id: '5', name: 'Grade 5'},
  {id: '6', name: 'Grade 6'},
  {id: '7', name: 'Grade 7'},
  {id: '8', name: 'Grade 8'},
  {id: '9', name: 'Grade 9'},
  {id: '10', name: 'Grade 10'},
  {id: '11', name: 'Grade 11'},
  {id: '12', name: 'Grade 12'},
];

const AddStudentForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    // Handle the submission of student details here
    console.log('Student Details:', {
      firstName,
      lastName,
      age,
      grade,
    });

    // Clear the form
    setFirstName('');
    setLastName('');
    setAge('');
    setGrade('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <TextInput style={styles.input} editable={false} value={grade} />
      </TouchableOpacity>
      <DropDownModel
        data={grades}
        setValue={setGrade}
        visible={modalVisible}
        setVisible={setModalVisible}
        id={"id"}
        name={"name"}
      />
    </View>
  );
};
0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  gradeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
});

export default AddStudentForm;
