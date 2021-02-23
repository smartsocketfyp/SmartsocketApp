import * as React from 'react';
import {useEffect} from "react";
import { Image, View, Text, StyleSheet} from 'react-native';

function ConnectedScreen( {route, navigation} ) {
    let data = route.params;
    useEffect(() => {
      setTimeout(() => navigation.push('Main Function', data), 1500);
    });
    
    return (
      <View style={styles.container}>
         {/* <Image
            style = {styles.Connected_Image}
            source = {require('../assets/Connected_Image.PNG')}/> */}
         
          <Text style = {styles.Connected}>YAY! You are connected</Text>
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

    // Connected_Image: {
    //   // original dimension: 1080 x 1920
    //   width: 270,
    //   height: 405,
    //   marginTop: 50,
    //   marginBottom: 50,
  // },
    Connected: {
      textAlign: 'center',
      backgroundColor : '#00FF00',
      marginLeft: 25,
      marginRight: 25,
      marginTop: 50,
      marginBottom: 50,
      height: 40,
      width : 300,
      color: "#000", 
      fontWeight: "bold", 
      fontSize: 20,
      borderColor: 'gray', 
      borderWidth: 5,
    },
  });

export default ConnectedScreen;