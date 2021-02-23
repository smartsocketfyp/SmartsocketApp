import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";

function EmailVerificationScreen({ route, navigation }) {
    let emailphone = route.params;

    const handleVerification = () => {
        var user = firebase.auth().currentUser;

        user.sendEmailVerification()
        .then(() => {
            //If all issues resolved
            alert("Verification email sent!");
        }) 
        
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            alert(errorMessage);
            console.log(error);
        });
    };
    
    return (
        
        <ScrollView>
            <View style={styles.container}>
                <Text style = {styles.Instructions}> {"Follow the instructions sent to \n"} 
                <Text style = {styles.Instructions_email}>{emailphone}</Text>. Proceed to login after the account is successfully verified</Text>
                

                <TouchableOpacity
                        style={styles.Navigation_Button}
                        onPress={() => navigation.navigate("Login") }
                    >
                    <Text style = {styles.Button_Text}> Proceed to Login </Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style={styles.Navigation_Button}
                        onPress={() => handleVerification() }
                    >
                    <Text style = {styles.Button_Text}> Resend Verification Email </Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style = {styles.Instructions}
                        onPress={() => navigation.navigate("Sign Up")}
                    >
                        <Text style = {styles.Instructions}>
                            Still did not receive email? Please check your email<Text style = {{color: "#0000FF"}}> here </Text>and submit again 
                        </Text>
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
        fontWeight: "300", 
        fontSize: 15
    },

    container: {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    Instructions_email: {
        color: "#000080", 
        fontWeight: "500", 
        fontSize: 15
      },

    Navigation_Button: {
        backgroundColor : '#000080',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Button_Text: {
        color: "#FFF",
        fontWeight: "600"
    }
});

export default EmailVerificationScreen;



