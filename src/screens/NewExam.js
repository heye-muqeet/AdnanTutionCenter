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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import DateTimePicker from 'react-native-ui-datepicker';
// import { Dayjs } from 'dayjs';

const NewExam = ({route, navigation}) => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [loader, setLoader] = useState(false);
  const [disableNext, setDisableNext] = useState(true);

  // const [date, setDate] = useState(Dayjs);
  // console.log(date)

  const {board, classes} = route.params;

  console.log('Board: ', board);
  console.log('Class: ', classes);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = data => {
    const dateStr = new Date(data);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  
    const day = days[dateStr.getDay()];
    const dd = String(dateStr.getDate()).padStart(2, '0');
    const mm = months[dateStr.getMonth()];
    const yyyy = dateStr.getFullYear();
  
    const date =  `${day}, ${dd}-${mm}-${yyyy}`;

    console.log('A date has been picked: ', date);

    setDate(date);
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
          value={date}
        />
        <TouchableOpacity style={styles.btnPik} onPress={showDatePicker}>
          <Text style={styles.btnText}>Pik a date</Text>
        </TouchableOpacity>
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode = 'date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        />
      </View>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Exam Title"
        placeholderTextColor={'grey'}
        onChangeText={text => setTitle(text)}
        value={title}
      />

      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Subject Name"
        placeholderTextColor={'grey'}
        onChangeText={text => setSubject(text)}
        value={subject}
      />

      <Text style={styles.label}>Topic</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Topics Covered in Exam"
        placeholderTextColor={'grey'}
        onChangeText={text => setTopic(text)}
        value={topic}
      />

      <Text style={styles.label}>Total Marks</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Total Marks"
        placeholderTextColor={'grey'}
        onChangeText={text => setTotalMarks(text)}
        value={totalMarks}
      />

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btnLeft}
          disabled={loader}
          onPress={() => {
            if (
              (date != '',
              title != '',
              subject != '',
              topic != '',
              totalMarks != '')
            ) {
              setLoader(true);
              setTimeout(() => {
                setLoader(false);
                const data = {
                  date,
                  title,
                  subject,
                  topic,
                  totalMarks,
                };
                console.log(data);
                setDate('');
                setTitle('');
                setSubject('');
                setTopic('');
                setTotalMarks('');
                ToastAndroid.showWithGravity(
                  'Saved Successfully!',
                  ToastAndroid.SHORT,
                  ToastAndroid.TOP,
                );
                setDisableNext(false);
              }, 2000);
            } else {
              Alert.alert('Error', 'All fields must be filled up!');
            }
          }}>
          {loader ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.btnText}>Save</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRight}
          onPress={() => {
            navigation.navigate('ExamMarks');
          }}
          disabled={disableNext}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
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

  dateInput: {
    width: '70%',
    color: colors.black,
    backgroundColor: colors.white,
    paddingLeft: 15,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
  },

  textInput: {
    marginHorizontal: 10,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingLeft: 15,
    borderWidth: 0.3,
  },

  btnContainer: {
    width: '50%',
    marginTop: 30,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  btnLeft: {
    backgroundColor: colors.primary,
    padding: 10,
    width: '50%',
    height: 45,
    borderWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: colors.primary,
  },

  btnRight: {
    backgroundColor: colors.primary,
    padding: 10,
    borderWidth: 0.2,
    width: '50%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.primary,
  },

  btnText: {
    fontWeight: '700',
    textAlign: 'center',
    color: colors.white,
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});