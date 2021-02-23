import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class SchedulingTimesUpScreen extends React.Component {
	render(){
		return(
            <View style={styles.container}>
                <Text style = {styles.Instructions}> Smart socket has switched off! </Text>
                
                
                <TouchableOpacity
                        style={styles.Navigation_Button}
                        onPress={() => this.props.navigation.navigate("Main Function")}
                    >
                    <Text style = {styles.Button_Text}> Return to Main Function page </Text>
                </TouchableOpacity>

            </View>
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