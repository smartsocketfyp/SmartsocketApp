import * as React from 'react';
import { Image, View, Text, StyleSheet,  ScrollView, TouchableOpacity} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";

export default class ScanNowScreen extends React.Component {
    handleUserVerified = () => {
        var user = firebase.auth().currentUser;
        var UserVerified = user.emailVerified;

        if(UserVerified){
             this.props.navigation.navigate("Camera")
            // this.props.navigation.navigate("Main Function")
        }     
        else{
            alert("Email not verified, please try again")
        }
    };
    
    render(){
		return(
            <ScrollView>
            <View style={styles.container}>
                {/* <Image
                        style = {styles.Scan_Now}
                        source = {require('../assets/Scan_Now_Image.PNG')}
                    /> */}
                <Text style = {styles.Instructions}>Scan the QR Code of the Smart Socket</Text>

                <TouchableOpacity
                        style={styles.Scan_Now_Button}
                        onPress={() => this.handleUserVerified()}
                    >
                        <Text style = {styles.Button_Text}> Proceed to scan </Text>
                </TouchableOpacity>
           </View>
           </ScrollView>
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

    // Scan_Now_Image: {
    //     // 1080 x 1350
    //     width: 540,
    //     height: 675,
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

    Button_Text: {
        color: "#FFF",
        fontWeight: "600"
    },
});