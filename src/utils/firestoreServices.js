import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

export const exportToFirebase = async(collection, document)  => {
  try {
    const id = uuid.v4();
    const res = await firestore().collection(collection).doc(id).set({...document, id});
    return id;
  } catch (error) {
    Alert.alert('Error', error.message);
    throw error;
  }
};

