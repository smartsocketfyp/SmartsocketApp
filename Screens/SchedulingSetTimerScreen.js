import * as React from 'react';
import {useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';
import {useNetInfo} from "@react-native-community/netinfo";

function SchedulingSetTimerScreen({ route, navigation }) {
    let data = route.params;
    const netInfo = useNetInfo();
    const [Time_before_finish, setTime_before_finish] = React.useState('');
    const [datetime, setdatetime] = React.useState('');
    const [RST, setRST] = React.useState('');

    useEffect(() => {
      setImmediate(() => readData({data}));
      clearImmediate();
      setInterval(() => readData({data}), 1000);
    });

    const readData = ({data}) => {
      var ref = firebase.database().ref('/Socket ID/' + data.slice(17,20)).child("Reset");
      ref.on("value", function(snapshot){
          setRST(snapshot.val()) ;
      });
    };

    const handleSendData = (Time_before_finish) => {

        var user = firebase.auth().currentUser;
        var now = new Date();
        var future = new Date(now.getTime() + Time_before_finish*60000);
        
        //convert to string
        var ending = future +  " "
        
        firebase.database().ref('/Socket ID/' + data.slice(17,20)).update({
            AppSwitch: 1,
            Completion_Time: ending,
            Current_User_Email: user.email,
        }).then((data) => {
            console.log('data', data)
        }).catch((error) => {
            console.log('error', error)
        })
    }
    
    return (
      <View>
        <View style={(netInfo.isConnected) ? styles.Connection_Connected: styles.Connection_Disconnected}>
            <Text style = {(netInfo.isConnected) ? styles.Connection_Text: styles.Disconnection_Text}> 
              {(netInfo.isConnected === true)? 'You are connected to the device' : 'You are disconnected from the device'} 
            </Text>
        </View>
        <View style={styles.container}>
          <Text style = {styles.Instructions}> Set the time before Socket No.{data.slice(17,20)} switches off</Text>
        
          <TextInput
              style={styles.Key_In_Timer}
              placeholder="Time in MINUTES"
              value={Time_before_finish}
              onChangeText={setTime_before_finish}
              keyboardType = {'numeric'}
          />

          <TouchableOpacity
              style= {(RST === 1) ? styles.neutralButton : 
                (netInfo.isConnected === false) ? styles.Disabled_Button : styles.Start_Button}
              onPress={() => handleSendData(Time_before_finish) > navigation.push('Countdown', {Time_before_finish, data})}
              disabled = {((netInfo.isConnected === false) || (RST === 1))}
          >
              <Text style = {styles.Button_Text}> 
                  {(RST === 1) ? 'Please wait a while' : 'Start Now'} 
              </Text>
          </TouchableOpacity>   
          
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    Connection_Connected: {
      height: 30,
      width : '100%',
      alignItems: 'center',
      backgroundColor: '#00F000',
    },

    Connection_Disconnected: {
        height: 30,
        width : '100%',
        alignItems: 'center',
        backgroundColor: '#F00000',
        
    },

    Connection_Text: {
        textAlign: 'center',
        color: "#000000", 
        fontWeight: "300", 
        marginTop: 5,
        fontSize: 15
    },

    Disconnection_Text: {
        textAlign: 'center',
        color: "#FFFFFF", 
        fontWeight: "300", 
        marginTop: 5,
        fontSize: 15
    },
    
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    
    Instructions: {
      textAlign: 'center',
      marginLeft: 25,
      marginRight: 25,
      marginTop: 50,
      marginBottom: 25,
      color: "#000", 
      fontWeight: "300", 
      fontSize: 20
    },

    Key_In_Timer: {
      height: 50, 
      width : 300,
      borderColor: 'gray', 
      borderWidth: 1,
      marginTop: 25,
      marginBottom: 25,
    },

    Disabled_Button: {
      backgroundColor : '#AAAAAA',
      borderRadius : 4,
      height: 52,
      width : 300,
      marginTop: 25,
      marginBottom: 250,
      alignItems: 'center',
      justifyContent: 'center'
    },

    Start_Button: {
      backgroundColor : '#000080',
      borderRadius : 4,
      height: 52,
      width : 300,
      marginTop: 25,
      marginBottom: 250,
      alignItems: 'center',
      justifyContent: 'center'
    },

    neutralButton: {
      backgroundColor : '#AAAAAA',
      borderRadius : 4,
      height: 52,
      width : 300,
      marginTop: 25,
      marginBottom: 250,
      alignItems: 'center',
      justifyContent: 'center'
    },

    Button_Text: {
        color: "#FFF",
        fontWeight: "600"
    }

});

export default SchedulingSetTimerScreen;