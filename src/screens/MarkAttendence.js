import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../constants/globalstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const MarkAttendence = ({ route }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loader, setLoader] = useState(false);
  const { board, classes } = route.params;
  const [studentsData, setStudentsData] = useState([]);

  const getData = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('userId');
      const querySnapshot = await firestore()
        .collection('students')
        .where('board', '==', board)
        .where('class', '==', classes)
        .where('userId', '==', currentUser)
        .get();

      let tempStudentsData = [];

      querySnapshot.forEach(documentSnapshot => {
        const { id, name } = documentSnapshot.data();
        const student = { id, name };
        tempStudentsData.push(student);
      });

      setStudentsData(tempStudentsData);

      const initialAttendance = tempStudentsData.map(student => ({
        id: student.id,
        status: 'Present',
      }));
      setAttendanceData(initialAttendance);

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const markAttendance = (studentId, status) => {
    const updatedAttendance = attendanceData.map(item =>
      item.id === studentId ? { ...item, status } : item,
    );
    setAttendanceData(updatedAttendance);
  };

  const handleSubmit = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      console.log(attendanceData);

      ToastAndroid.showWithGravity(
        'Submitted Successfully!',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainHeading}>Attendance Sheet</Text>

      {studentsData.map(student => (
        <View key={student.id} style={styles.subContainer}>
          <View style={styles.mainView}>
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
                        item.id === student.id && item.status === 'Present',
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
                          item.id === student.id && item.status === 'Present',
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
                        item.id === student.id && item.status === 'Absent',
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
                          item.id === student.id && item.status === 'Absent',
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

  subContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderWidth: 0.1,
    borderRadius: 30,
    marginVertical: 3,
  },

  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  mainHeading: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
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

