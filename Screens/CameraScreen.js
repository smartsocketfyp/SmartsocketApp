import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';
import { BarCodeScanner } from 'expo-barcode-scanner';

function CameraScreen( {navigation} ) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [Status, setStatus] = React.useState('');

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

    const handleBarCodeScanned = ({data}) => {
        setScanned(true);   

        firebase.database().ref('/Socket ID/' + data.slice(17,20)).once('value').then(function(snapshot) {
            var In_Use = snapshot.child("In_Use").val() ;
            if(In_Use === 1){
                alert("Socket in used, please try another socket")
            }
            else{
                if((data.slice(0,16) == 'Aily065105108121')){
                    navigation.push("Connected", data);
                }
        
                else {
                    navigation.navigate("Not Connected")
                }
            }
        })
    };

        if (hasPermission === null) {
            return(
                <View style={styles.container}>
                    <Text style = {styles.PermissionFail}> Requesting for permission to use the camera </Text>
                </View>
            );
        }
        if (hasPermission === false) {
            return(
                <View style={styles.container}>
                    <Text style = {styles.PermissionFail}> Ouch! Access to the phone's camera is denied. Please modify your phone settings and try again </Text>
                </View>
            );
        }
    
    return (
    <View style={styles.container}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.camerasize}
        >
            <Text style = {styles.Instructions}> Look for a socket with a QR code</Text>

        {scanned && 
            <TouchableOpacity
                style={styles.Scan_Again_Button}
                onPress={() => setScanned(false)}
            >
                <Text style = {styles.Button_Text}> Please wait... {'\n'} Press here to scan again if you fail to connect</Text>
            </TouchableOpacity>
        }

        </BarCodeScanner>
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
        color: "#fff", 
        fontWeight: "300", 
        fontSize: 25,
        backgroundColor: '#000000'
    },

    PermissionFail: {
        marginLeft: 50,
        marginRight: 50,
        textAlign: 'center',
        color: "#000", 
        fontWeight: "300", 
        fontSize: 15,
    },

    camerasize:{
        height: '100%',
        width: '100%',
    },

    Scan_Again_Button: {
        backgroundColor : '#005000',
        borderRadius : 4,
        height: 50,
        width : '100%',
        marginTop: 175,
        marginBottom: 175,
        alignContent: 'center',
        
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    Button_Text: {
        color: "#FFF",
        fontWeight: "600",
        textAlign: 'center',
        alignItems: 'center',

    }
});

export default CameraScreen;