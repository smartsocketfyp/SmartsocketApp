import * as React from 'react';
import {useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';
import {useNetInfo} from "@react-native-community/netinfo";

function PowerUsageScreen({ route, navigation }) {
    let {data, StartPower} = route.params;
    const netInfo = useNetInfo();
    const [PowerConsumed, setPowerConsumed] = React.useState(0);
    const [currenttime, setcurrenttime] = React.useState('');

    useEffect(() => {
        setImmediate(() => (getDate() > readData({data})));
        setInterval(() => (getDate() > readData({data})), 60000);
    });

    const readData = ({data}) => {
        firebase.database().ref('/Socket ID/' + data.slice(17,20)).once('value').then((snapshot) => {
        setPowerConsumed(snapshot.val() && snapshot.val().Cumulative_Power) ;
        })
    };

    const getDate = () => {
        var now = new Date();
        var time = new Date(now.getTime());
        setcurrenttime(time + "");
    }

    return (
        <View>
            <View style={(netInfo.isConnected) ? styles.Connection_Connected: styles.Connection_Disconnected}>
                <Text style = {(netInfo.isConnected) ? styles.Connection_Text: styles.Disconnection_Text}> 
                    {(netInfo.isConnected === true)? 'You are connected to the device' : 'You are disconnected from the device'} 
                </Text>
            </View>

            <View style={styles.container}>
                <Text style = {styles.Instructions}> {'Power Consumption of \n'} Socket No.{data.slice(17,20)} (Watts) </Text>

                <Text style = {styles.Display}> {PowerConsumed - StartPower} </Text>

                <Text style = {styles.Instructions}> {'Last updated at:\n'}{currenttime} </Text>

                
                <Text style = {(netInfo.isConnected) ? styles.Button_Text : styles.Warning_Text}> Warning: Your device is disconnected. The data received may be outdated </Text>

                <TouchableOpacity
                    style={styles.Navigation_Button}
                    onPress={() => navigation.navigate('Main Function')}
                >
                    <Text style = {styles.Button_Text}> Return to Main Function </Text>
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

    Display: {
        textAlign: 'center',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        marginBottom: 10,
        color: "#000", 
        fontWeight: "bold", 
        fontSize: 40,
        borderColor: 'gray', 
        borderWidth: 5,
        height: 60,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
      },

    Navigation_Button: {
      backgroundColor : '#000080',
      borderRadius : 4,
      height: 52,
      width : 300,
      marginTop: 25,
      marginBottom: 250,
      alignItems: 'center',
      justifyContent: 'center'
    },

    Warning_Text: {
        textAlign: 'center',
        color: "#800000",
        fontWeight: "600"
    },

    Button_Text: {
        color: "#FFF",
        fontWeight: "600"
    }

});

export default PowerUsageScreen;