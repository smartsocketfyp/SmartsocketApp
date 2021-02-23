import * as React from 'react';
import {View, TextInput, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";

function ForgetPasswordScreen({ navigation }) {
    const [emailphone, setemailphone] = React.useState('');

    const handleForgetPassword = ({emailphone}) => {
        firebase.auth().sendPasswordResetEmail(
            emailphone)
            .catch(function(error) {
                var errorMessage = error.message;
                alert(errorMessage);
                console.log(error);
            });
    };

    
    
    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style = {styles.Instructions}> Key in your email or phone number</Text>
            
            <TextInput
                placeholder = "Email or phone number"
                style={styles.Key_In_email}
                value={emailphone}
                onChangeText={setemailphone}                    
            />

            <TouchableOpacity
                style={styles.Submit_Button}
                //onPress={() => handleForgetPassword({emailphone}) > navigation.push('Reset Verification', emailphone)}
                onPress={() => handleForgetPassword({emailphone}) > navigation.push('Password Reset', emailphone)}
                //onPress={() => handleForgetPassword({emailphone}) > navigation.push('Password Reset', emailphone)}
            >
                <Text style = {styles.Button_Text}> Submit </Text>
            </TouchableOpacity>   

        </View>
        </ScrollView>

    
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
        fontWeight: "bold", 
        fontSize: 25
    },

    container: {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    Key_In_email: {
      height: 50, 
      width : 300,
      borderColor: 'gray', 
      borderWidth: 1,
      marginTop: 25,
      marginBottom: 25,
    },

    Submit_Button: {
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

export default ForgetPasswordScreen;



