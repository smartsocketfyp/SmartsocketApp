import * as React from 'react';
import {useEffect} from "react";
import { View, Text, StyleSheet} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';

function ConnectedScreen( {route, navigation} ) {
    let data = route.params;

    const handleSignIn = () => {
      var now = new Date();
      var user = firebase.auth().currentUser;
      var date = (now.getMonth() + 1) + "-" + now.getDate() + "," + now.getHours() + ":" + now.getMinutes();       

      firebase.database().ref('/Socket ID/' + data.slice(17,20)).update({
          AppSwitch: 0,
          Current_User_Email: user.email,
          In_Use: 1
      }).then((data) => {
          console.log('data', data)
      }).catch((error) => {
          console.log('error', error)
      })

      firebase.database().ref('/Socket ID/' + data.slice(17,20) + '/User_Activity/').push({
        Time_of_Sign_In: now + " ",
        User_Email: user.email,
      }).then((data) => {
          console.log('data', data)
      }).catch((error) => {
          console.log('error', error)
      })
    };

    useEffect(() => {
      setTimeout(() => handleSignIn() > navigation.push('Main Function', data), 1500);
    });
    
    return (
      <View style={styles.container}>
          <Text style = {styles.Connected}>YAY! You are connected</Text>
      </View>
      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex : 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    
    Connected: {
      textAlign: 'center',
      backgroundColor : '#00FF00',
      marginLeft: 25,
      marginRight: 25,
      marginTop: 50,
      marginBottom: 50,
      height: 40,
      width : 300,
      color: "#000", 
      fontWeight: "bold", 
      fontSize: 20,
      borderColor: 'gray', 
      borderWidth: 5,
    },
  });

export default ConnectedScreen;