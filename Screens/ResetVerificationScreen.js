import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';

function ResetVerificationScreen({ route, navigation }) {
    const [OTP_passcode, setOTP_passcode] = React.useState('');

    let emailphone = route.params;
  
    return (
      <ScrollView>

        <View style={styles.container}>
          <Text style = {styles.Instructions}> Enter the One Time Password sent to
              <Text style = {styles.Instructions_email}> {emailphone} </Text> 
          to reset password </Text>

          <TextInput
              style={styles.Key_In_OTP}
              placeholder="123456"
              value={OTP_passcode}
              onChangeText={setOTP_passcode}                   
              keyboardType = {'numeric'}
          />

          <TouchableOpacity
            style={styles.Navigation_Button}
            onPress={() => navigation.navigate('Reset Password')}
          >
            <Text style = {styles.Button_Text}> Submit </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style = {{ alignSelf: "center", marginTop: 25, marginBottom: 25}}
              onPress={() => navigation.navigate("Forget Password")}
          >
              <Text style = {{color: "#000000", fontSize: 15}}>
                  Wrong email/phone number? Click <Text style = {{color: "#0000FF"}}>here </Text>
              </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
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
      marginTop: 25,
      marginBottom: 25,
      color: "#000", 
      fontWeight: "bold", 
      fontSize: 20
    },

    Instructions_email: {
        color: "#000080", 
        fontWeight: "500", 
        fontSize: 20
      },

    Key_In_OTP: {
        height: 50, 
        width : 300,
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop: 25,
        marginBottom: 25,
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

export default ResetVerificationScreen;