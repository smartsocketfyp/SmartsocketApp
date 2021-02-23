import * as React from 'react';
import {useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';

function OnOffScreen( {route, navigation} ) {
    let data = route.params;
    const [Status, setStatus] = React.useState('');
    //const [currenttime, setcurrenttime] = React.useState('');

    useEffect(() => {
        setInterval(() => readData({data}), 1000);
    });

    const readData = ({data}) => {
        firebase.database().ref('/Socket ID/' + data.slice(17,20)).once('value').then((snapshot) => {
        setStatus(snapshot.val() && snapshot.val().SocketOn) ;
        })
    };

    const handleSwitch = ({Status}) => {
        var user = firebase.auth().currentUser;
        
        if(Status === false){
            firebase.database().ref('/Socket ID/' + data.slice(17,20)).update({
                SocketOn: true,
                Completion_Time: 0,
                User_Email: user.email
            }).then((data) => {
                console.log('data', data)
            }).catch((error) => {
                console.log('error', error)
            })
        }

        else if(Status === true){
            firebase.database().ref('/Socket ID/' + data.slice(17,20)).update({
                SocketOn: false,
                Completion_Time: 0,
                User_Email: user.email
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
        
        <View style={styles.container}>
            <Text style = {styles.Instructions}> Socket No. {data.slice(17,20)} {'is currently \n'}  
                 {(Status) ? 'switched on' : (Status === false) ? 'switched off' : '___'}
            </Text>            

            <TouchableOpacity
                    style = {
                        (Status)?
                        styles.Off_Button: (Status === false) ? styles.On_Button : styles.neutralButton}
                    onPress={() => handleSwitch({Status})}
                >
                <Text style = {styles.Button_Text}> 
                    {(Status) ? 'Switch off Socket' : (Status === false) ? 'Switch on Socket' : 'Please wait a while'} 
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                    style={styles.Navigation_Button}
                    onPress={() => navigation.navigate("Main Function")}
                >
                <Text style = {styles.Button_Text}> Return to functions page </Text>
            </TouchableOpacity>  
        
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
    
    Instructions: {
        textAlign: 'center',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 200,
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
        backgroundColor : '#111111',
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