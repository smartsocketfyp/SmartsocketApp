import * as React from 'react';
import {useEffect} from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';
import {useNetInfo} from "@react-native-community/netinfo";

function MainFunctionScreen( {route, navigation} ) {
    let data  = route.params;
    const netInfo = useNetInfo();
    const [StartPower, setStartPower] = React.useState('');
    const [EndPower, setEndPower] = React.useState('');

    useEffect(() => {
        setImmediate(() => handleAuthStateChange());
        clearImmediate;
    });

    const handleAuthStateChange = () => {
        var database = firebase.database();
        var auth = firebase.auth();

        auth.onAuthStateChanged(function(user) {
            if (user) {
                database.ref('/Socket ID/' + data.slice(17,20)).once('value').then((snapshot) => {
                setStartPower((snapshot.val() && snapshot.val().Cumulative_Power)) ;
                })
            }

            else {
                database.ref('/Socket ID/' + data.slice(17,20)).once('value').then((snapshot) => {
                setEndPower((snapshot.val() && snapshot.val().Cumulative_Power)) ;
                })
            }
            console.log("Start Power is " + StartPower);
            console.log("End Power is " + EndPower);
        });
    }
    
    const handleFullSignOut = () => {
        var database = firebase.database();
        var user = firebase.auth().currentUser;
        var now = new Date();
        var date = (now.getMonth() + 1) + "-" + now.getDate() + "," + now.getHours() + ":" + now.getMinutes();        
        
        firebase.auth().signOut()

        database.ref('/Socket ID/' + data.slice(17,20)).once('value').then(function(snapshot) {
            database.ref('/Socket ID/' + data.slice(17,20) + '/User_Activity/').push({
                Power_Consumed: snapshot.val() && snapshot.val().Cumulative_Power - StartPower,
                User_Email: user.email,
                Time_of_Sign_Out: now + ""
            }).then((data) => {
                console.log('data', data)
            }).catch((error) => {
                console.log('error', error)
            })

            database.ref('/Usage History/' + user.uid).push({
                Power_Consumed: snapshot.val() && snapshot.val().Cumulative_Power - StartPower,
                Socket_Used: data.slice(17,20),
                Time_of_Sign_Out: now + ""
            }).then((data) => {
                console.log('data', data)
            }).catch((error) => {
                console.log('error', error)
            })

            setEndPower((snapshot.val() && snapshot.val().Cumulative_Power)) ;
        })


        database.ref('/Socket ID/' + data.slice(17,20)).update({
            AppSwitch: 0,
            Completion_Time: 0,
            Current_User_Email: 'no user',
            In_Use: 0,
        }).then((data) => {
            console.log('data', data)
        }).catch((error) => {
            console.log('error', error)
        })
    };

    const handlePartialSignOut = () => {
        var database = firebase.database();
        var user = firebase.auth().currentUser;
        var now = new Date();
        var date = (now.getMonth() + 1) + "-" + now.getDate() + "," + now.getHours() + ":" + now.getMinutes();        

        database.ref('/Socket ID/' + data.slice(17,20)).once('value').then(function(snapshot) {
            database.ref('/Socket ID/' + data.slice(17,20) + '/User_Activity/').push({
                Power_Consumed: snapshot.val() && snapshot.val().Cumulative_Power - StartPower,
                User_Email: user.email,
                Time_of_Sign_Out: now + ""
            }).then((data) => {
                console.log('data', data)
            }).catch((error) => {
                console.log('error', error)
            })

            database.ref('/Usage History/' + user.uid).push({
                Power_Consumed: snapshot.val() && snapshot.val().Cumulative_Power - StartPower,
                Socket_Used: data.slice(17,20),
                Time_of_Sign_Out: now + ""
            }).then((data) => {
                console.log('data', data)
            }).catch((error) => {
                console.log('error', error)
            })

            setEndPower((snapshot.val() && snapshot.val().Cumulative_Power)) ;
        })


        database.ref('/Socket ID/' + data.slice(17,20)).update({
            AppSwitch: 0,
            Completion_Time: 0,
            Current_User_Email: 'no user',
            In_Use: 0,
        }).then((data) => {
            console.log('data', data)
        }).catch((error) => {
            console.log('error', error)
        })
    };

    const readDataforTimer = ({data}) => {
        firebase.database().ref('/Socket ID/' + data.slice(17,20)).once('value').then((snapshot) => {
        var SocketStatus = (snapshot.val() && snapshot.val().AppSwitch) ;
        
        if(SocketStatus){
            navigation.push("Set Timer", data);
        }
        else if(!SocketStatus){
            alert('Socket has already been switched off');
        }

        else {
            alert('Please wait a while');
        }
        })        
    };

    const handleChangeSocket = () => {
        Alert.alert(
            "Change Socket ?",
            "The socket that you are currently using will be switched off",
            [
                { 
                    text: "OK", 
                    onPress: () => handlePartialSignOut() > navigation.navigate("Scan Now"), 
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                }
            ],
            { cancelable: false }
        );
    };
    
    return (
        <ScrollView>
            <View style={(netInfo.isConnected) ? styles.Connection_Connected: styles.Connection_Disconnected}>
                <Text style = {(netInfo.isConnected) ? styles.Connection_Text: styles.Disconnection_Text}> 
                    {(netInfo.isConnected === true)? 'You are connected to the device' : 'You are disconnected from the device'} 
                </Text>
            </View>
            
            <View style={styles.container}>
                <Text style = {styles.Title}> Main Functions </Text>
                <Text style = {styles.Instructions}> Control your Aily socket here. You are connected to Socket No. {data.slice(17,20)} </Text>

                <TouchableOpacity
                    style={(netInfo.isConnected) ? styles.Navigation_Buttons : styles.Navigation_Buttons_Disabled}
                    disabled = {(netInfo.isConnected === false)}
                    onPress={() => navigation.push("On Off", data)}
                >
                    <Text style = {styles.Button_Text}> Switch on/off socket </Text>
                </TouchableOpacity>   

                <TouchableOpacity
                    style={(netInfo.isConnected) ? styles.Navigation_Buttons : styles.Navigation_Buttons_Disabled}
                    disabled = {(netInfo.isConnected === false)}
                    onPress={() => readDataforTimer({data}) }
                >
                    <Text style = {styles.Button_Text}> Switch on/off socket via schedule </Text>
                </TouchableOpacity>   

                <TouchableOpacity
                    style={(netInfo.isConnected) ? styles.Navigation_Buttons : styles.Navigation_Buttons_Disabled}
                    disabled = {(netInfo.isConnected === false)}
                    onPress={() => navigation.push("Power Usage", {data, StartPower})}
                >
                    <Text style = {styles.Button_Text}> Check Power Consumption Here </Text>
                </TouchableOpacity>   

                <TouchableOpacity
                    style={(netInfo.isConnected) ? styles.Navigation_Buttons : styles.Navigation_Buttons_Disabled}
                    disabled = {(netInfo.isConnected === false)}
                    onPress={() => navigation.push("Past Usage", {StartPower, EndPower})}
                >
                    <Text style = {styles.Button_Text}> Past Usage of Aily Sockets </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.Navigation_Buttons}
                    onPress={() => handleChangeSocket()}
                >
                    <Text style = {styles.Button_Text}> Use a Different Aily Socket </Text>
                </TouchableOpacity>   

                <TouchableOpacity
                    style={styles.Log_Out_Buttons}
                    onPress={() => handleFullSignOut() > navigation.navigate("Home")}
                >
                    <Text style = {styles.Button_Text}> Log Out </Text>
                </TouchableOpacity>   

            </View>
        </ScrollView>
      
      
    );
}

const styles = StyleSheet.create({
    Connection_Connected: {
        height: 70,
        width : '100%',
        flex : 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#00F000',
        flexWrap: 'wrap',
    },

    Connection_Disconnected: {
        height: 70,
        width : '100%',
        flex : 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#F00000',
        flexWrap: 'wrap',
    },

    Connection_Text: {
        textAlign: 'center',
        color: "#000000", 
        fontWeight: "300", 
        marginTop: 50,
        fontSize: 15
    },

    Disconnection_Text: {
        textAlign: 'center',
        color: "#FFFFFF", 
        fontWeight: "300", 
        marginTop: 50,
        fontSize: 15
    },
    
    container: {
        height: 575,
        width : '100%',
        flex : 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        flexWrap: 'wrap',
    },

    Title: {
        textAlign: 'center',
        marginLeft: 50,
        marginRight: 50,
        marginTop: 10,
        marginBottom: 10,
        color: "#000", 
        fontWeight: "bold", 
        fontSize: 25
    },

    Instructions: {
        textAlign: 'center',
        marginLeft: 50,
        marginRight: 50,
        marginTop: 0,
        marginBottom: 0,
        color: "#000", 
        fontWeight: "300", 
        fontSize: 15
    },

    Navigation_Buttons: {
        backgroundColor : '#000080',
        borderRadius : 4,
        height: 125,
        width : 125,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },

    Navigation_Buttons_Disabled: {
        backgroundColor : '#AAAAAA',
        borderRadius : 4,
        height: 125,
        width : 125,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },

    Log_Out_Buttons: {
        backgroundColor : '#A00000',
        borderRadius : 4,
        height: 125,
        width : 125,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'center'
    },

    Button_Text: {
        textAlign: 'center',
        color: "#FFF",
        fontWeight: "600"
    }
});

export default MainFunctionScreen;