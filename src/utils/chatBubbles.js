import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/globalstyles';

// import { Ionicons } from "react-native-vector-icons";


const ChatBubble = ({ role, text, onSpeech }) => {
  return (
    <View style={[styles.chatItem, role === 'user' ? styles.userChatItem : styles.modelChatItem]}>
      <Text style={styles.chatText}>{text}</Text>
      {role === 'model' && (
        <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
          <Text>@</Text>
          {/* <Ionicons name="volume-high-outline" size={24} color="#fff" /> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  chatItem: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '70%',
    position: 'relative',
  },

  userChatItem: {
    backgroundColor: colors.dark,
    alignSelf: 'flex-end',
  },

  modelChatItem: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
  },

  chatText: {
    fontSize: 16,
    color: '#fff',
  },

  speakerIcon: {
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
});