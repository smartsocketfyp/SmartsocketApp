import * as React from 'react';
import {useEffect} from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';

function PowerUsageScreen({ route, navigation }) {
    let data = route.params;
    const [PowerConsumed, setPowerConsumed] = React.useState('');
    const [currenttime, setcurrenttime] = React.useState('');

    useEffect(() => {
        setInterval(() => (getDate() > readData({data})), 1000);
    });

    const readData = ({data}) => {
        firebase.database().ref('/Socket ID/' + data.slice(17,20)).once('value').then((snapshot) => {
        setPowerConsumed(snapshot.val() && snapshot.val().Power) ;
        })
    };

    const getDate = () => {
        var now = new Date();
        var time = new Date(now.getTime());
        setcurrenttime(time + "");
    }

    return (
        <View style={styles.container}>

            {/* <Image
                style = {styles.Power_Usage_Image}
                source = {require('../assets/Power_Usage_Image.png')}
                /> */}

            <Text style = {styles.Instructions}> {'Power Consumption of \n'} Socket No.{data.slice(17,20)} (Watts) </Text>

            <Text style = {styles.Display}> {(PowerConsumed)? PowerConsumed : '0'} </Text>

            <Text style = {styles.Instructions}> {'Last updated at:\n'}{currenttime} </Text>

            <TouchableOpacity
                style={styles.Navigation_Button}
                onPress={() => navigation.navigate('Main Function')}
            >
                <Text style = {styles.Button_Text}> Return to Main Function </Text>
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

    // Power_Usage_Image: {
    //     width: 1080,
    //     height: 608,
    //     marginTop: 50,
    //     marginBottom: 50,
    // },

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

    Button_Text: {
        color: "#FFF",
        fontWeight: "600"
    }

});

export default PowerUsageScreen;