import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import colors from '../constants/globalstyles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import DateTimePicker from 'react-native-ui-datepicker';
// import { Dayjs } from 'dayjs';

const NewExam = ({route}) => {
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

    const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
    };

    return (
    <View style={styles.container}>
    <Text style={styles.mainHeading}>New Exam Form</Text>

    <Text style={styles.label}>Date</Text>
    <View style={styles.datePickier} >
        <TextInput
        style={styles.textInput}
        placeholder="Enter Student Name"
        placeholderTextColor={'grey'}
        />
        <TouchableOpacity onPress={showDatePicker}><Text style = {styles.btnPik}>Pik a date</Text></TouchableOpacity>
        {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */}
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

    datePickier:{
        arginHorizontal: 10,
        color: colors.black,
        backgroundColor: colors.primary,
        borderRadius: 30,
        // paddingLeft: 15,
        borderWidth: 0.3,
        flexDirection: 'row'
        // textopacity: 0.2,
    },

    btnPik:{
        color: colors.white,
        alignSelf: 'center',
        textAlign: 'center'
    },

    textInput: {
        // marginHorizontal: 10,
        width: '70%',
        color: colors.black,
        backgroundColor: colors.white,
        borderRadius: 30,
        paddingLeft: 15,
        // borderWidth: 0.3,
        // textopacity: 0.2,
    },
    
});
