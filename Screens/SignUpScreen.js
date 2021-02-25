import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";

function SignUpScreen({ navigation }) {
    const [fullname, setfullname] = React.useState('');
    const [username, setusername] = React.useState('');
    const [emailPhonenumber, setemailPhonenumber] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [confirmpassword, setconfirmpassword] = React.useState('');

    const handleSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(emailPhonenumber, password)
        .then(() => {
            //If all issues resolved
            handleVerification();
            navigation.push("Email Verification", emailPhonenumber);
        }) 
        
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            var errorCode = error.code;

            if (errorCode == 'auth/email-already-in-use'){
                navigation.push("Email Verification", emailPhonenumber);
            }

            else{
                alert(errorMessage);
                console.log(error);
            }            
        });
    };

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
                <Text style = {styles.Instructions}> Fill in the details below</Text>

                <TextInput
                    style={styles.Full_Name}
                    placeholder="Full Name*"
                    value={fullname}
                    onChangeText={setfullname}
                />

                <TextInput
                    style={styles.Username}
                    placeholder="Username*"
                    value={username}
                    onChangeText={setusername}
                />

                <TextInput
                    style={styles.Email_Phone}
                    placeholder="Email*"
                    value={emailPhonenumber}
                    onChangeText={setemailPhonenumber}
                />

                <Text style={(password.length < 8) ? styles.Warning_Message : styles.Password_Accepted}> 
                    {(password.length < 8) ? 'Password must be at least 8 characters' : 'Password accepted!'}
                </Text>

                <TextInput
                    style={styles.Password}
                    placeholder="Password*"
                    value={password}
                    onChangeText={setpassword}
                    secureTextEntry
                />

                <Text style={(password != confirmpassword) ? styles.Warning_Message : styles.Password_Accepted}> 
                    {(password != confirmpassword) ? 'Passwords do not match!' : 'Passwords match!'}
                </Text>

                <TextInput
                    style={styles.Confirm_Password}
                    placeholder="Confirm Password*"
                    value={confirmpassword}
                    onChangeText={setconfirmpassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style = {styles.Navigation_Text}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style = {{color: "#000000", fontSize: 15}}>
                        Have an account? <Text style = {{color: "#0000FF"}}> Sign in </Text> here!
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style = 
                    {(
                        (fullname == '')||
                        (username == '')||
                        (emailPhonenumber == '')||
                        (password == '')||
                        (confirmpassword == '')||
                        (password != confirmpassword)
                    ) ? styles.Sign_Up_Button_Disabled : styles.Sign_Up_Button_Enabled}
                    
                    disabled = 
                    {
                        (fullname == '')||
                        (username == '')||
                        (emailPhonenumber == '')||
                        (password == '')||
                        (confirmpassword == '')||
                        (password != confirmpassword)||
                        (password.length < 8)
                    } 
                    onPress={() => handleSignUp()}
                    //onPress={() => this.props.navigation.navigate("Verification")}
                >
                    <Text style = {styles.Button_Text}> Sign Up </Text>
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
        color: "#000", 
        fontWeight: "bold", 
        fontSize: 25,
        marginTop: 50,
        marginBottom: 25,
    },

    Full_Name: {
        height: 50, 
        width : 300,
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop: 25,
        marginBottom: 25,
    },

    Username: {
        height: 50, 
        width : 300,
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop: 25,
        marginBottom: 25,
    },

    Email_Phone: {
        height: 50, 
        width : 300,
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop: 25,
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

    Navigation_Text: {
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 5
    },

    Sign_Up_Button_Disabled: {
        backgroundColor : '#800000',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Sign_Up_Button_Enabled: {
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

export default SignUpScreen;