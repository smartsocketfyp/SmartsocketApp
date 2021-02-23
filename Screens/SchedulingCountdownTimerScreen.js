import * as React from 'react';
import CountDown from 'react-native-countdown-component';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';

function SchedulingCountdownTimerScreen({ route, navigation }) {
    let {Time_before_finish, data} = route.params;

    const handleFinish = () => {
      var user = firebase.auth().currentUser;
      
      firebase.database().ref('/Socket ID/' + data.slice(17,20)).update({
          SocketOn: false,
          Completion_Time: 0,
          User_Email: user.email,
      }).then((data) => {
          console.log('data', data)
      }).catch((error) => {
          console.log('error', error)
      })
  }

    return (
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
          style={styles.Stop_Button}
          onPress={() => handleFinish() > navigation.navigate('Times Up')}
        >
          <Text style = {styles.Button_Text}> Stop Now </Text>
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

    Button_Text: {
        color: "#FFF",
        fontWeight: "600"
    }
});

export default SchedulingCountdownTimerScreen;