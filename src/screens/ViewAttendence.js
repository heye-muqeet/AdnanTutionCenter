import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../constants/globalstyles';
import {getAttendenceByLog, getStudent} from '../utils/firestoreServices';

const ViewAttendence = ({route}) => {
  const {logId, topic} = route.params;
  const [attendanceData, setAttendanceData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoader(true);
      const logData = await getAttendenceByLog(logId);
      let data = [];

      for (const obj of logData) {
        const {studentId, status} = obj;
        const {name} = await getStudent(obj.studentId);
        data.push({studentId, status, name});
      }

      setAttendanceData(data);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainHeading}>Attendance Sheet</Text>
      <View style={styles.topicContainer}>
        <Text style={styles.label}>Topic:</Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          editable={false}
          aria-disabled
          value={topic}
        />
      </View>

      <FlatList
        data={attendanceData}
        onRefresh={getData}
        refreshing={loader}
        keyExtractor={obj => obj.studentId}
        renderItem={({item}) => (
          <View style={styles.subContainer}>
            <View style={styles.studentNameContainer}>
              <Text style={styles.stdName}>{item.name}</Text>
            </View>
            <View style={styles.attendenceStatusContainer}>
              <TouchableOpacity
                style={[
                  styles.attendenceBtn,
                  {
                    backgroundColor:
                      item.status === 'Present' ? colors.primary : colors.white,
                  },
                ]}>
                <Text
                  style={[
                    styles.attendenceBtnTxt,
                    {
                      color:
                        item.status === 'Present' ? colors.white : colors.black,
                    },
                  ]}>
                  Present
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.attendenceBtn,
                  {
                    backgroundColor:
                      item.status === 'Absent' ? colors.primary : colors.white,
                  },
                ]}>
                <Text
                  style={[
                    styles.attendenceBtnTxt,
                    {
                      color:
                        item.status === 'Absent' ? colors.white : colors.black,
                    },
                  ]}>
                  Absent
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ViewAttendence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.secondary,
  },

  topicContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },

  label: {
    paddingLeft: 10,
    color: colors.black,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
    width: '20%',
  },

  textInput: {
    marginHorizontal: 10,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingHorizontal: 15,
    borderWidth: 0.1,
    width: '80%',
  },

  mainHeading: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },

  subContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderWidth: 0.1,
    borderRadius: 30,
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