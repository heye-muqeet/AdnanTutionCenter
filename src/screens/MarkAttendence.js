import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../constants/globalstyles';

const studentsData = [
  {id: 1, name: 'Abdul Muqeet'},
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

const MarkAttendence = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [absentStd, setAbsentStd] = useState([]);
  // const [selectedTab, setSelectedTab] = useState(0);

  const markAttendance = (studentId, status) => {
    const updatedAttendance = attendanceData.filter(
      item => item.id !== studentId,

      );
      updatedAttendance.push({id: studentId, status: status});
      setAbsentStd(prev => [...prev, studentId]);
    setAttendanceData(updatedAttendance);
  };

  const handleSubmit = () => {
    console.log('Attendance Data:');
    console.log(absentStd);
    console.log(attendanceData);
    // Here you can send the attendance data to your backend or perform any other action
    // Reset attendance data
    setAttendanceData([]);
  };

  return (
    // <View style={styles.container}>
    <ScrollView style={styles.container}>
      <Text style={styles.mainHeading}>Attendance Sheet</Text>

      {studentsData.map(student => (
        <View key={student.id} style={styles.subContainer}>
          <View style={styles.mainView}>
            <Text style={styles.stdName}>{student.name}</Text>
            <View
              style={{
                width: '50%',
                height: 35,
                borderWidth: 0.1,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 2.5,
              }}>
              <TouchableOpacity
                style={{
                  width: '50%',
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: absentStd.includes(student.id)
                    ? colors.white
                    : colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  // setSelectedTab(0);
                  const tempArray =absentStd.filter(item => item !== student.id);
                  console.log(tempArray);
                  setAbsentStd(tempArray);
                  markAttendance(student.id, 'Present');
                }}>
                <Text
                  style={{
                    color: absentStd.includes(student.id)
                      ? colors.black
                      : colors.white,
                    fontSize: 15,
                    fontWeight: 700,
                  }}>
                  Presen
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '50%',
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: absentStd.includes(student.id)
                    ? colors.primary
                    : colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  // setSelectedTab(1);
                  markAttendance(student.id, 'Absent');
                }}>
                <Text
                  style={{
                    color: absentStd.includes(student.id)
                      ? colors.white
                      : colors.black,
                    fontSize: 15,
                    fontWeight: 700,
                  }}>
                  Absent
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.btnView}>
            <TouchableOpacity style={styles.btnPresent} onPress={() => markAttendance(student.id, 'Present')}>
              <Text style={styles.btntxt}>Present</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnAbsent} onPress={() => markAttendance(student.id, 'Absent')}>
              <Text style={styles.btntxt}>Absent</Text>
            </TouchableOpacity>
          </View> */}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btntxt}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
    // </View>
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

  mainHeading: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  stdName: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 5,
    marginLeft: 5,
    // paddingTop: 10,
  },

  btnPresent: {
    backgroundColor: 'green',
    // width: '',
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    // alignSelf: 'center',
  },

  btnAbsent: {
    backgroundColor: 'red',
    // width: '',
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    // alignSelf: 'center',
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

// const MarkAttendence = () => {

//   const [stdName, setStdName] = useState();
//   const [attendanceStatus, setAttendanceStatus] = useState();

//   return (
//     <View style={styles.container}>
//       <Text style={{ fontSize: 20, marginBottom: 10 }}>Mark Attendance</Text>
//       <TextInput
//         style={{ marginBottom: 10, height: 40, borderColor: 'gray', borderWidth: 1, padding: 5 }}
//         placeholder="Enter Student Name"
//         value={stdName}
//         onChangeText={(text)=>setStdName(text)}
//       />
//       <Text>Attendance Status:</Text>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
//         <Button title="Present" onPress={() => setAttendanceStatus('Present')} />
//         <Button title="Absent" onPress={() => setAttendanceStatus('Absent')} />
//       </View>
//       <Button title="Submit" onPress={()=>{}} />
//     </View>
//   )
// }

// export default MarkAttendence
