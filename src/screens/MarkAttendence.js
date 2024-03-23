import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../constants/globalstyles';

const studentsData = [
  {id: 1, name: 'Abdul Muqeet Khanhuihuihuih iuui ui hui u hn '},
  {id: 2, name: 'M Jahanzaib'},
  {id: 3, name: 'Moon'},
  {id: 4, name: 'Mughal'},
  {id: 5, name: 'Zeeshan'},
  {id: 6, name: 'Faiq'},
  {id: 7, name: 'Sumaira'},
  {id: 8, name: 'Arshia'},
  {id: 9, name: 'Summi'},
  {id: 10, name: 'Salma'},
  {id: 11, name: 'Rashid'},
  {id: 12, name: 'Rsahida'},
  {id: 13, name: 'Noor Jahan'},
  {id: 14, name: 'Muhammad Ali'},

  // Add more students as needed
];

const MarkAttendence = ({route}) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loader, setLoader] = useState(false);
  const {board, classes} = route.params;

  useEffect(() => {
    // console.log(board)
    // console.log(classes)
    const initialAttendance = studentsData.map(student => ({
      id: student.id,
      status: 'Present',
    }));
    setAttendanceData(initialAttendance);
  }, []);

  const markAttendance = (studentId, status) => {
    const updatedAttendance = attendanceData.filter(
      item => item.id !== studentId,
    );
    updatedAttendance.push({id: studentId, status: status});
    setAttendanceData(updatedAttendance);
  };

  const onPressPresent = studentId => {
    markAttendance(studentId, 'Present');
  };
  const onPressAbsent = studentId => {
    markAttendance(studentId, 'Absent');
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
                  onPressPresent(student.id);
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
                  onPressAbsent(student.id);
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
    // paddingTop: 5,
    // backgroundColor: colors.primary,
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
