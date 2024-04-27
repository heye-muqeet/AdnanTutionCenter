import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../constants/globalstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  exportToFirebase,
  getClass,
  getStudents,
} from '../utils/firestoreServices';

const MarkAttendence = ({route}) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loader, setLoader] = useState(false);
  const {board, grade} = route.params;
  const [studentsData, setStudentsData] = useState([]);
  const [topic, setTopic] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('userId');
      const gradeId = await getClass(board, grade);
      const tempStudentsData = await getStudents(gradeId);
      setStudentsData(tempStudentsData);

      const initialAttendance = tempStudentsData.map(student => ({
        studentId: student.id,
        status: 'Present',
      }));
      setAttendanceData(initialAttendance);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const markAttendance = (studentId, status) => {
    const updatedAttendance = attendanceData.map(item =>
      item.studentId === studentId ? {...item, status} : item,
    );
    setAttendanceData(updatedAttendance);
  };

  const handleSubmit = async () => {
    if (!topic) return Alert.alert('REQUIRED', 'Please fill Topic Name');

    try {
      setLoader(true);
      const gradeId = await getClass(board, grade);
      const date = new Date().toDateString();
      const userId = await AsyncStorage.getItem('userId');

      const attendanceLogData = {
        userId: userId,
        date: date,
        cid: gradeId,
        topic: topic,
      };

      const attendanceId = await exportToFirebase(
        'attendenceLog',
        attendanceLogData,
      );

      attendanceData.forEach(async doc => {
        await exportToFirebase('attendence', {...doc, attendanceId, userId});
      });

      ToastAndroid.showWithGravity(
        'Submitted Successfully!',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      setLoader(false);
    } catch (error) {
      setLoader(false);
      Alert.alert('Error', error.message);
    }

    setTimeout(() => {}, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainHeading}>Attendance Sheet</Text>
      <View style={styles.topicContainer}>
        <Text style={styles.label}>Topic:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Topic Name"
          placeholderTextColor={'grey'}
          onChangeText={text => setTopic(text)}
          multiline
          value={topic}
        />
      </View>
      {studentsData &&
        studentsData.map(student => (
          <View key={student.studentId} style={styles.subContainer}>
            <View style={styles.studentNameContainer}>
              <Text style={styles.stdName}>{student.name}</Text>
            </View>
            <View style={styles.attendenceStatusContainer}>
              <TouchableOpacity
                style={[
                  styles.attendenceBtn,
                  {
                    backgroundColor: attendanceData.find(
                      item =>
                        item.studentId === student.id &&
                        item.status === 'Present',
                    )
                      ? colors.primary
                      : colors.white,
                  },
                ]}
                onPress={() => {
                  markAttendance(student.id, 'Present');
                }}>
                <Text
                  style={[
                    styles.attendenceBtnTxt,
                    {
                      color: attendanceData.find(
                        item =>
                          item.studentId === student.id &&
                          item.status === 'Present',
                      )
                        ? colors.white
                        : colors.black,
                    },
                  ]}>
                  Present
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.attendenceBtn,
                  {
                    backgroundColor: attendanceData.find(
                      item =>
                        item.studentId === student.id &&
                        item.status === 'Absent',
                    )
                      ? colors.primary
                      : colors.white,
                  },
                ]}
                onPress={() => {
                  markAttendance(student.id, 'Absent');
                }}>
                <Text
                  style={[
                    styles.attendenceBtnTxt,
                    {
                      color: attendanceData.find(
                        item =>
                          item.studentId === student.id &&
                          item.status === 'Absent',
                      )
                        ? colors.white
                        : colors.black,
                    },
                  ]}>
                  Absent
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

      <TouchableOpacity
        style={styles.btn}
        disabled={loader}
        onPress={handleSubmit}>
        {loader ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.btntxt}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MarkAttendence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.secondary,
  },

  topicContainer:{
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderRadius: 15,
    // marginVertical: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    // flexWrap: 'wrap',
  },

  label: {
    paddingLeft: 10,
    color: colors.black,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
    width: '20%',
    // paddingRight: 20,
  },

  textInput: {
    marginHorizontal: 10,
    // marginRight: 10,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: colors.secondary,
    width: '80%'
  },
  
    mainHeading: {
      color: colors.black,
      textAlign: 'center',
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 15,
    },

  subContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderRadius: 15,
    marginVertical: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  studentNameContainer: {
    alignSelf: 'center',
    width: '50%',
  },

  stdName: {
    color: colors.black,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  attendenceStatusContainer: {
    width: '50%',
    height: 35,
    borderWidth: 0.1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2.5,
    alignSelf: 'center',
  },

  attendenceBtn: {
    width: '50%',
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  attendenceBtnTxt: {
    fontSize: 15,
    fontWeight: '700',
  },

  btn: {
    backgroundColor: colors.primary,
    width: '40%',
    marginTop: 30,
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 60,
  },

  btntxt: {
    fontWeight: 'bold',
    color: colors.secondary,
    alignSelf: 'center',
  },
});
