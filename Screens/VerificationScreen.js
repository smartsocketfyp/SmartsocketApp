import * as React from 'react';
import {View, TextInput, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class VerificationScreen extends React.Component {
    state = {
        OTP_Passcode: "",
    }
    
    render(){
		return(
            <ScrollView>
                <View style={styles.container}>
                    <Text style = {styles.Instructions}> Key in the One-Time Password sent to your email/mobile phone</Text>
                    
                    <TextInput
                        style={styles.Key_In_OTP}
                        placeholder="123456"
                        value={this.state.OTP_Passcode}
                        onChangeText={OTP_Passcode => this.setState({OTP_Passcode})}
                        keyboardType = {'numeric'}
                    />

                    <TouchableOpacity
                        style={styles.Submit_Button}
                        onPress={() => this.props.navigation.navigate("Scan Now")}
                    >
                        <Text style = {styles.Button_Text}> Submit </Text>
                    </TouchableOpacity>   

                    <TouchableOpacity
                        style = {{ alignSelf: "center", marginTop: 25, marginBottom: 250}}
                        onPress={() => this.props.navigation.navigate("Sign Up")}
                    >
                        <Text style = {{color: "#000000", fontSize: 15, textAlign: 'center'}}>
                            {'Did not receive code?\nClick'} <Text style = {{color: "#0000FF"}}>here </Text>
                            to check your details again
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            
            
		)
	}
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

    Key_In_OTP: {
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
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Button_Text: {
        color: "#FFF",
        fontWeight: "600"
    }
});