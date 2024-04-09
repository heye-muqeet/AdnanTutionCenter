import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HorizontalCard from '../components/HorizontalCard';
import colors from '../constants/globalstyles';

const availableClasses = [
  {id: 1, name: '9th', src: require('../assets/images/9th.png')},
  {id: 2, name: '10th', src: require('../assets/images/10th.png')},
  {id: 3, name: '11th', src: require('../assets/images/11th.png')},
  {id: 4, name: '12th', src: require('../assets/images/12th.png')},
];

// console.log(availableClasses[0].src);

const availableBoards = [
  {id: 1, name: 'Federal Board', code: 'FB'},
  {id: 2, name: 'Sindh Board', code: 'KB'},
];

const ClassSelection = ({route, navigation}) => {
  const {menuItem} = route.params;

  // console.log(menuItem);
  return (
    <ScrollView style={{flex: 1}}>
      {availableBoards.map(board => (
        <View key={board.id} style={styles.container}>
          <Text style={styles.board}>{board.name}</Text>

          {availableClasses.map(classes => (
            <HorizontalCard
              key={classes.id}
              style={styles.card}
              imgSrc={classes.src}
              text={'Class ' + classes.name + ' (' + board.code + ')'}
              navigate={() => {
                if (menuItem === '2') {
                  navigation.navigate('MarkAttendence', {
                    board: board.name,
                    classes: classes.name,
                  });
                } else if (menuItem === '3') {
                  navigation.navigate('NewExam', {
                    board: board.id,
                    classes: classes.id,
                  });
                } else if (menuItem === '4') {
                  navigation.navigate('Students', {
                    board: board.name,
                    classes: classes.name,
                  });
                }
              }}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default ClassSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.secondary,
    // flexDirection: 'row'
  },

  board: {
    color: colors.primary,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
  },

  card: {
    // width: '100%',
  },
});
