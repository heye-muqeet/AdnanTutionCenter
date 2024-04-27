import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getAttendenceLog, getClass} from '../utils/firestoreServices';
import colors from '../constants/globalstyles';

const AttendenceLog = ({route, navigation}) => {
  const {board, grade} = route.params;
  const [data, setData] = useState([]);

  const getRenderData = async () => {
    const gradeId = await getClass(board, grade);
    try {
      const attendanceLogs = await getAttendenceLog(gradeId);
      const sortedLogs = attendanceLogs.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
      setData(sortedLogs);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    getRenderData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {data &&
        data.map(log => (
          <TouchableOpacity
            key={log.id}
            style={styles.subContainer}
            onPress={() => {
              navigation.navigate('ViewAttendence', {
                logId: log.id,
                topic: log.topic,
              });
            }}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateTxt}>{log.date}</Text>
            </View>
            <View style={styles.topicContainer}>
              <Text style={styles.topicTxt}>
                {log.topic ? log.topic.toUpperCase() : ''}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export default AttendenceLog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.secondary,
  },

  subContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 3,
    paddingVertical: 10,
    alignItems: 'center',
  },

  dateContainer: {
    backgroundColor: colors.secondary,
    padding: 7.5,
    borderRadius: 10,
    marginBottom: 5,
  },

  dateTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },

  topicContainer: {
    marginTop: 5,
  },

  topicTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
