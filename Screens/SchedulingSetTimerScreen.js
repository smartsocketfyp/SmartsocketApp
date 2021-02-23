import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';

function SchedulingSetTimerScreen({ route, navigation }) {
    let data = route.params;
    const [Time_before_finish, setTime_before_finish] = React.useState('');
    const [SocketOn, setSocketOn] = React.useState(true);
    const [datetime, setdatetime] = React.useState('');

    
    const handleSendData = ({SocketOn, Time_before_finish}) => {

        var user = firebase.auth().currentUser;
        var now = new Date();
        var future = new Date(now.getTime() + Time_before_finish*60000);
        
        //convert to string
        var ending = future +  " "
        
        firebase.database().ref('/Socket ID/' + data.slice(17,20)).update({
            SocketOn,
            Completion_Time: ending,
            User_Email: user.email,
        }).then((data) => {
            console.log('data', data)
        }).catch((error) => {
            console.log('error', error)
        })
    }
    
    return (
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
            style={styles.Start_Button}
            onPress={() => handleSendData({SocketOn, Time_before_finish}) > navigation.push('Countdown', {Time_before_finish, data})}
        >
            <Text style = {styles.Button_Text}> Start Now </Text>
        </TouchableOpacity>   
        
      </View>
    );
  }

  const styles = StyleSheet.create({
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
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    Key_In_Timer: {
      height: 50, 
      width : 300,
      borderColor: 'gray', 
      borderWidth: 1,
      marginTop: 25,
      marginBottom: 25,
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

    Button_Text: {
        color: "#FFF",
        fontWeight: "600"
    }

});

export default SchedulingSetTimerScreen;