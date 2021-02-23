import * as React from 'react';
import { Image, View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';


export default class HomeScreen extends React.Component {
	render(){
		return(
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        style = {styles.Aily_Logo}
                        source = {require('../assets/10.png')} />

                    <TouchableOpacity
                        style={styles.Log_In_Button}
                        onPress={() => this.props.navigation.navigate("Login")}
                    >
                        <Text style = {styles.Button_Text}> Log In </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.Sign_Up_Button}
                        onPress={() => this.props.navigation.navigate("Sign Up")}
                        // onPress={() => this.props.navigation.navigate("Power Usage Bar")}
                    >
                        <Text style = {styles.Button_Text}> Sign Up </Text>
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
    
    Aily_Logo: {
        width: 309,
        height: 156,
        marginTop: 50,
        marginBottom: 50,
    },
    
    Log_In_Button: {
        backgroundColor : '#000080',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 50,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Sign_Up_Button: {
        backgroundColor : '#000080',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 0,
        marginBottom: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    Button_Text: {
        color: "#FFF",
        fontWeight: "600"
    }
});