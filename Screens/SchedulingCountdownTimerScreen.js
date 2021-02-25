import * as React from 'react';
import CountDown from 'react-native-countdown-component';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';
import {useNetInfo} from "@react-native-community/netinfo";

function SchedulingCountdownTimerScreen({ route, navigation }) {
    let {Time_before_finish, data} = route.params;
    const netInfo = useNetInfo();

    const handleFinish = () => {
      var user = firebase.auth().currentUser;
      
      firebase.database().ref('/Socket ID/' + data.slice(17,20)).update({
          AppSwitch: 0,
          Completion_Time: 0,
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
                {(netInfo.isConnected === true)? '\n You are connected to the device' : '\n You are disconnected from the device'} 
            </Text>
        </View>

        <View style={styles.container}>
          <Text style = {styles.Instructions}> Time before socket No. {data.slice(17,20)} {'\n switches off'}</Text>
        
          <CountDown 
            size={30}
            until={Time_before_finish*60}
            onFinish={() => handleFinish() > navigation.navigate('Times Up')}
            digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
            digitTxtStyle={{color: '#000000'}}
            timeLabelStyle={{color: '#1CC625', fontWeight: 'bold'}}
            separatorStyle={{color: '#000000'}}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{h: 'Hour', m: 'Minutes', s: 'Seconds'}}
            showSeparator
          />

          <TouchableOpacity
            style={(netInfo.isConnected === true) ? styles.Stop_Button : styles.Stop_Button_Disabled}
            disabled = {(netInfo.isConnected === false)}
            onPress={() => handleFinish() > navigation.navigate('Times Up')}
          >
            <Text style = {styles.Button_Text}> Stop Now </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    Connection_Connected: {
        height: 50,
        width : '100%',
        alignItems: 'center',
        backgroundColor: '#00F000',
    },

    Connection_Disconnected: {
        height: 50,
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

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    Stop_Button: {
        backgroundColor : '#000080',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Stop_Button_Disabled: {
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

export default SchedulingCountdownTimerScreen;