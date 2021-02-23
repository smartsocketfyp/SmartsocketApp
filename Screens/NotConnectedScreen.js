import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class NotConnectedScreen extends React.Component {
	render(){
		return(
            <View style={styles.container}>
                <Text style = {styles.Instructions}> {"The QR Code scanned is invalid. \n Please try again."} </Text>

                <TouchableOpacity
                        style={styles.Navigation_Button}
                        onPress={() => this.props.navigation.navigate("Camera")}
                    >
                    <Text style = {styles.Button_Text}> Scan again </Text>
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