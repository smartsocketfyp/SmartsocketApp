import firebase from 'react-native-firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1A-1dRzIT-ZRUKkmLhroKnFfZZ6M5QaI",
  authDomain: "smart-socket-trial-e6ec8.firebaseapp.com",
  databaseURL: "https://smart-socket-trial-e6ec8.firebaseio.com",
  projectId: "smart-socket-trial-e6ec8",
  storageBucket: "smart-socket-trial-e6ec8.appspot.com",
  messagingSenderId: "1094436654426",
  appId: "1:1094436654426:web:c4f8d4731eef908ae87763",
  measurementId: "G-5MM7JDNS8Y"
};

const Firebase_Config = firebase.initializeApp(firebaseConfig);
export default Firebase_Config;