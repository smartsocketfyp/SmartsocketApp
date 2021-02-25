import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";

export default class ScanNowScreen extends React.Component {
    handleSignOut = () => {
        firebase.auth().signOut()
    };

    handleUserVerified = () => {
        var user = firebase.auth().currentUser;
        var UserVerified = user.emailVerified;

        if(UserVerified){
            this.props.navigation.navigate("Camera")
        }
        
        else{
            alert("Email not verified, please try again")
        }
    };
    
    render(){

		return(
            <View style={styles.container}>
                <Text style = {styles.Instructions}>Scan the QR Code of the Smart Socket</Text>

                <TouchableOpacity
                        style={styles.Scan_Now_Button}
                        onPress={() => this.handleUserVerified()}
                    >
                        <Text style = {styles.Button_Text}> Proceed to scan </Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style={styles.Scan_Now_Button}
                        onPress={() => this.props.navigation.navigate("Past Usage")}
                    >
                        <Text style = {styles.Button_Text}> Past Usage of Aily </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.Log_Out_Button}
                    onPress={() => this.handleSignOut() > this.props.navigation.navigate("Home")}
                >
                    <Text style = {styles.Button_Text}> Log Out </Text>
                </TouchableOpacity>

            </View>
		)
	}
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
        marginTop: 50,
        marginBottom: 25,
        color: "#000", 
        fontWeight: "bold", 
        fontSize: 25
    },

    Scan_Now_Button: {
        backgroundColor : '#000080',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Log_Out_Button: {
        backgroundColor : '#800000',
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
    },

    

    
});