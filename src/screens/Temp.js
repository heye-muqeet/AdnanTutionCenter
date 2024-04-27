import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet} from 'react-native';
import {getAttendenceByLog, getAttendenceLog, getClass, getStudent} from '../utils/firestoreServices';
import colors from '../constants/globalstyles';
import firestore from '@react-native-firebase/firestore';

const Temp = ({route, navigation}) => {
  const [data, setData] = useState([]);

  const handleSubmit = async () => {
    try {
      // const studentID = "79beaadb-c2b9-4e91-8ac3-3927bc7c3d77"; 
      const attendanceId = "d3d1c089-0247-49b6-bca3-7848897e5115";
      
      const attendenceData = await getAttendenceByLog(attendanceId)
      
      attendenceData.map(async (obj)=>{
        const {studentId, status} = obj
        const {name} = await getStudent(obj.studentId)
        data.push({studentId, status, name})
      })
      
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <View>
      <TouchableOpacity style={styles.subContainer} onPress={handleSubmit}>
        <Text>Hit ME</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Temp;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 15,
    backgroundColor: colors.secondary,
  },

  subContainer:{
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderWidth: 0.1,
    borderRadius: 30,
    marginVertical: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },  

  topicContainer:{

  },

  dateContainer:{

  },
})