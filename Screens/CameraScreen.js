import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

function CameraScreen( {navigation} ) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

    const handleBarCodeScanned = ({data}) => {
        setScanned(true);        

        if((data.slice(0,16) == 'Aily065105108121')){
            navigation.push("Connected", data);
        }

        else {
            navigation.navigate("Not Connected")
        }
    };

        if (hasPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
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
                <Text style = {styles.Button_Text}> Press to scan again </Text>
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

    camerasize:{
        height: '100%',
        width: '100%',
    },

    Scan_Again_Button: {
        backgroundColor : '#005000',
        borderRadius : 4,
        height: 50,
        width : 400,
        marginTop: 175,
        marginBottom: 175,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Button_Text: {
        color: "#FFF",
        fontWeight: "600"
    }
});

export default CameraScreen;