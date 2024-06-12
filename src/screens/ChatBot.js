import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import ChatBubble from '../utils/chatBubbles';
import Tts from 'react-native-tts';
import colors from '../constants/globalstyles';

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = 'AIzaSyCAyFdindAAzqqbkccKQGZqijXVkZXFh3U';

  const handleUserInput = async () => {
    setError(false);
    if (!userInput.trim()) {
      setError('Please enter a message.');
      return;
    }  

    let updatedChat = [
      ...chat,
      {
        role: 'user',
        parts: [{text: userInput}],
      },
    ];
    setLoading(true);

    try {
      // console.log('Hello');
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          contents:[
            {
              parts: [
                {
                  text: userInput,
                }
              ]
            }
          ]

          // prompt: 
          // {
          //   contents: updatedChat,
          //   // messages: updatedChat.map(item => ({
          //   //   role: item.role,
          //   //   content: item.parts[0].text,
          //   // })),
          // },
        },
      );

      // console.log('Gemini Pro API Response:', response.data);

      const modelResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      // const modelResponse = response.data.candidates?.[0]?.content || '';
      console.log('Model Response:', modelResponse);

      if (modelResponse) {
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role: 'model',
            parts: [{text: modelResponse}],
          },
        ];

        setChat(updatedChatWithModel);
        setUserInput('');
      }
    } catch (error) {
      console.error('Error calling Gemini Pro API:', error);
      // console.error('Error response: ', error.response);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = async text => {
    if (isSpeaking) {
      Tts.stop();
      // stop();
      setIsSpeaking(false);
    } else {
      const ttsStatus = await Tts.voices();

      if (!ttsStatus.some(voice=>voice.isSpeaking)) {
        ttsStatus.speak(text);
        setIsSpeaking(true);
      }
    }
  };

  const renderChatItem = ({item}) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      onSpeech={() => handleSpeech(item.parts[0].text)}
    />
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Mughal Chatbot</Text> */}
      <FlatList
        data={chat}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />

      {error && <Text style={styles.error}>{error}</Text>}
      {loading && <ActivityIndicator size={'large'} style={styles.loading} color= {colors.primary} />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type Your Message..."
          placeholderTextColor="#aaa"
          value={userInput}
          onChangeText={setUserInput}
        />

        <TouchableOpacity style={styles.button} onPress={handleUserInput}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Chatbot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    backgroundColor: colors.secondary,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
    color: '#333',
    textAlign: 'center',
  },

  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  input: {
    flex: 1,
    // height: 50,
    marginRight: 10,
    padding: 8,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 25,
    color: '#333',
    backgroundColor: '#fff',
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: colors.primary,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },

  loading: {
    marginTop: 10,
    // fontSize: 100,
  },

  error: {
    color: 'red',
    marginTop: 10,
  },
});
