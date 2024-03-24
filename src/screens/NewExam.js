import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../constants/globalstyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import DateTimePicker from 'react-native-ui-datepicker';
// import { Dayjs } from 'dayjs';

const NewExam = ({route, navigation}) => {
  // const [date, setDate] = useState(Dayjs);
  // console.log(date)

  const {board, classes} = route.params;

  // console.log(board);
  // console.log(classes);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeading}>New Exam Details</Text>

      <Text style={styles.label}>Date</Text>
      <View style={styles.datePickier}>
        <TextInput
          style={styles.dateInput}
          placeholder="Pik an exam date    ------>"
          placeholderTextColor={'grey'}
          editable={false}
          
          /><TouchableOpacity style={styles.btnPik} onPress={showDatePicker}>
          <Text style={styles.textBtnPik}>Pik a date</Text>
        </TouchableOpacity>
        {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        /> */}
      </View>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Exam Title"
        placeholderTextColor={'grey'}
      />

      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Subject Name"
        placeholderTextColor={'grey'}
      />

      <Text style={styles.label}>Topic</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Topics Covered in Exam"
        placeholderTextColor={'grey'}
      />

      <Text style={styles.label}>Total Marks</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Total Marks"
        placeholderTextColor={'grey'}
      />

      <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate("ExamMarks")}}>
        <Text style={styles.btntxt}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewExam;

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

  datePickier: {
    borderRadius: 30,
    borderWidth: 0.3,
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  btnPik: {
    width: '30%',
    textAlign: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.primary,
  },

  textBtnPik: {
    color: colors.white,
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 15,
  },

  dateInput: {
    width: '70%',
    color: colors.black,
    backgroundColor: colors.white,
    // borderRadius: 30,
    paddingLeft: 15,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    // borderWidth: 0.3,
    // textopacity: 0.2,
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
    width: '30%',
    marginTop: 40,
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // textAlign: 'center',
  },

  btntxt: {
    fontWeight: '700',
    color: colors.secondary,
    textAlign: 'center',
  },
});
