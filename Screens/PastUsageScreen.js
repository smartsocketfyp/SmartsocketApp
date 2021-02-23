import * as React from 'react';
import { BarChart, Image, View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';

export default class PastUsageScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            list:[],
        } }

    componentDidMount(){
        var user = firebase.auth().currentUser;

        firebase.database().ref('/Usage History/' + user.uid).on('value', (snapshot) =>{
            var li = []
            snapshot.forEach((child)=>{
                li.push({
                    key: child.key,
                    Power_Consumed: child.val().Power_Consumed,
                    Socket_Used: child.val().Socket_Used,
                    Time_of_Sign_Out: child.val().Time_of_Sign_Out
                })
            })
            this.setState({list:li})
        })
    }

	render(){
		return(
            <ScrollView>
                <View style={styles.container}>
               
                {/* <Image
                        style = {styles.Past_Usage_Image}
                        source = {require('../assets/Past_Usage_Image.png')}
                    /> */}

                    <Text style = {styles.Instructions}> Records of Past Usage </Text>                
                    <FlatList style={styles.FlatList}
                        data={this.state.list}
                        keyExtractor={(item)=>item.key}
                        inverted = {true}
                        renderItem={({item})=>{
                            return(
                                <View>
                                    <Text style = {styles.History_Text_Variables}>
                                    {'Date and time of usage:'}{'\n'}
                                        <Text style = {styles.History_Text_Parameters}>{item.Time_of_Sign_Out}{'\n'}</Text>
                                    {'Socket Used: '}
                                        <Text style = {styles.History_Text_Parameters}>{item.Socket_Used}{'\n'}</Text>
                                    {'Power Consumed (Watts):'}
                                        <Text style = {styles.History_Text_Parameters}>{item.Power_Consumed}{'\n'}</Text>
                                    </Text>
                                </View>)
                        }}/>            
                </View>
            </ScrollView>

		)
	}
}

  const styles = StyleSheet.create({
    FlatList: {
        width : '100%',
        marginBottom: 50,
    },
    
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    // Past_Usage_Image: {
    //     width: 1080,
    //     height: 608,
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
    },

    History_Text_Variables: {
        color: "#000",
        fontWeight: "600",
        height: 100,
        width : '90%',
        fontSize: 15,
        marginLeft: 25,
        marginRight: 25,
    },
    History_Text_Parameters: {
        color: "#00F",
        fontWeight: "600",
        height: 100,
        width : '90%',
        fontSize: 15,
        marginLeft: 25,
        marginRight: 25,
    }
});
