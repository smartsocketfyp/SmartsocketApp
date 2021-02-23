import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
//import * as firebase from 'firebase';
//import firebase from 'firebase/app';
// import "firebase/auth";
//import { firebase } from '@react-native-firebase/auth';


export default class SignUpScreen extends React.Component {
    state = {
        password : "",
        confirmpassword : ""
    }
    
    render(){

		return(
            <ScrollView>
                <View style={styles.container}>
                    <Text style = {styles.Instructions}> Reset your password here</Text>

                    <Text style={(this.state.password.length < 8) ? styles.Warning_Message : styles.Password_Accepted}> 
                        {(this.state.password.length < 8) ? 'Password must be at least 8 characters' : 'Password accepted!'}
                    </Text>

                    <TextInput
                        style={styles.Password}
                        placeholder="Password*"
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        secureTextEntry
                    />

                    <Text style={(this.state.password != this.state.confirmpassword) ? styles.Warning_Message : styles.Password_Accepted}> 
                        {(this.state.password != this.state.confirmpassword) ? 'Password do not match!' : 'Password match!'}
                    </Text>

                    <TextInput
                        style={styles.Confirm_Password}
                        placeholder="Confirm Password*"
                        value={this.state.confirmpassword}
                        onChangeText={confirmpassword => this.setState({confirmpassword})}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style = 
                        {(
                            (this.state.password == '')||
                            (this.state.confirmpassword == '')||
                            (this.state.password != this.state.confirmpassword)
                        ) ? styles.Reset_Button_Disabled : styles.Reset_Button_Enabled}

                        disabled = 
                        {
                            (this.state.password == '')||
                            (this.state.confirmpassword == '')||
                            (this.state.password != this.state.confirmpassword)||
                            (this.state.password.length < 8)
                        } 
                        onPress={() => this.props.navigation.navigate("Password Reset")}
                    >
                        <Text style = {styles.Button_Text}> Reset </Text>
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
    
    Instructions: {
        textAlign: 'center',
        color: "#000", 
        fontWeight: "bold", 
        fontSize: 25,
        marginTop: 50,
        marginBottom: 25,
    },

    Password: {
        height: 50, 
        width : 300,
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop: 25,
        marginBottom: 25,
    },

    Confirm_Password: {
        height: 50, 
        width : 300,
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop: 25,
        marginBottom: 25, 
    },

    Warning_Message: {
        color: "#FF0000",
        fontWeight: "600",
        marginTop: 0,
        marginBottom: 0,
    },

    Password_Accepted: {
        color: "#00FF00",
        fontWeight: "600",
        marginTop: 0,
        marginBottom: 0,
    },

    Reset_Button_Disabled: {
        backgroundColor : '#800000',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Reset_Button_Enabled: {
        backgroundColor : '#000080',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Button_Text: {
        color: "#FFF",
        fontWeight: "600"
    }
});