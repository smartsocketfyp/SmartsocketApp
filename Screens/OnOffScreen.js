import * as React from 'react';
import {useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';
import {useNetInfo} from "@react-native-community/netinfo";

function OnOffScreen( {route, navigation} ) {
    let data = route.params;
    const netInfo = useNetInfo();
    const [Status, setStatus] = React.useState('');
    const [RST, setRST] = React.useState('');
    //const [currenttime, setcurrenttime] = React.useState('');

    useEffect(() => {
        setImmediate(() => readData({data}));
        clearImmediate();
        setInterval(() => readData({data}), 1000);
    });

    const readData = ({data}) => {
        var ref = firebase.database().ref('/Socket ID/' + data.slice(17,20)).child("AppSwitch");
        ref.on("value", function(snapshot){
            setStatus(snapshot.val()) ;
        });

        var ref = firebase.database().ref('/Socket ID/' + data.slice(17,20)).child("Reset");
        ref.on("value", function(snapshot){
            setRST(snapshot.val()) ;
        });
    };

    const handleSwitch = ({Status}) => {
        var user = firebase.auth().currentUser;
        
        if(Status === 0){
            firebase.database().ref('/Socket ID/' + data.slice(17,20)).update({
                AppSwitch: 1,
                Completion_Time: 0,
                Current_User_Email: user.email
            }).then((data) => {
                console.log('data', data)
            }).catch((error) => {
                console.log('error', error)
            })
        }

        else if(Status === 1){
            firebase.database().ref('/Socket ID/' + data.slice(17,20)).update({
                AppSwitch: 0,
                Completion_Time: 0,
                Current_User_Email: user.email
            }).then((data) => {
                console.log('data', data)
            }).catch((error) => {
                console.log('error', error)
            })
        }

        else{
            alert('Please wait')            
        }
    }

    
    return (        
        <View>
            <View style={(netInfo.isConnected) ? styles.Connection_Connected: styles.Connection_Disconnected}>
            <Text style = {(netInfo.isConnected) ? styles.Connection_Text: styles.Disconnection_Text}> 
                        {(netInfo.isConnected === true)? 'You are connected to the device' : 'You are disconnected from the device'} 
                </Text>
            </View>
            <View style={styles.container}>
                <Text style = {styles.Instructions}> Socket No. {data.slice(17,20)} {'is currently \n'}  
                    {(Status) ? 'switched on' : (Status === 0) ? 'switched off' : '___'}
                </Text>            

                <TouchableOpacity
                        style = {
                            ((netInfo.isConnected === false) || (RST === 1)) ? styles.neutralButton :
                            (Status)?
                            styles.Off_Button: (Status === 0) ? styles.On_Button : styles.neutralButton}
                        disabled = {((netInfo.isConnected === false) || (RST === 1))}
                        onPress={() => handleSwitch({Status})}
                    >
                    <Text style = {styles.Button_Text}> 
                        {((Status) && (RST === 0)) ? 'Switch off Socket' : ((Status === 0) && (RST === 0)) ? 'Switch on Socket' : 'Please wait a while'} 
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style={styles.Navigation_Button}
                        onPress={() => navigation.navigate("Main Function")}
                    >
                    <Text style = {styles.Button_Text}> Return to functions page </Text>
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
        marginTop: 100,
        marginBottom: 25,
        color: "#000", 
        fontWeight: "300", 
        fontSize: 20
    },

    Off_Button: {
        backgroundColor : '#800000',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    On_Button: {
        backgroundColor : '#008000',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    neutralButton: {
        backgroundColor : '#AAAAAA',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
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

    Button_Text: {
        color: "#FFF",
        fontWeight: "600"
    },
});

export default OnOffScreen;