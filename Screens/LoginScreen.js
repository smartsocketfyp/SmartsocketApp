import * as React from 'react';
import { View, TextInput, ScrollView, StyleSheet, TouchableOpacity, Text} from 'react-native';
import firebase from 'firebase/app';
import "firebase/auth";

function LoginScreen({ navigation }) {
    const [username, setusername] = React.useState('');
    const [password, setpassword] = React.useState('');

    // const handleFBLogin = () => {
    //     // Sign in using a popup.
    //     var provider = new firebase.auth.FacebookAuthProvider();
    //     provider.addScope('user_birthday');
    //     firebase.auth().signInWithPopup(provider).then(function(result) {
    //     // This gives you a Facebook Access Token.
    //     var token = result.credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;

    //     navigation.navigate("Scan Now");
    //     });
    // }

    const handleGoogleLogin = () => {
        //Using popup
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        navigation.navigate("Scan Now");
        });

        // check emulator for this
    }

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(username, password)
        .then(() => {
            //If all issues resolved
            var user = firebase.auth().currentUser;
            var UserVerified = user.emailVerified;

            if(UserVerified){
                navigation.navigate("Scan Now");
            }
            
            else{
                alert("Email not verified, please sign up again")
            }
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
                <Text style = {styles.Instructions}> Login to your account</Text>
                <TextInput
                    style={styles.Key_In_Username}
                    placeholder="Email or Phone Number"
                    value={username}
                    onChangeText={setusername}
                />
                
                <TextInput
                    style={styles.Key_In_Password}
                    placeholder="Password"
                    value={password}
                    onChangeText={setpassword}
                    secureTextEntry
                />
                
                <TouchableOpacity
                    style = {styles.Navigation_Text}
                    onPress={() => navigation.navigate("Forget Password")}
                >
                    <Text style = {{color: "#000000", fontSize: 15}}>
                        Forgot Password? Click <Text style = {{color: "#0000FF"}}> here </Text>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = {styles.Navigation_Text}
                    onPress={() => navigation.navigate("Sign Up")}
                >
                    <Text style = {{color: "#000000", fontSize: 15}}>
                        Don't have an account? <Text style = {{color: "#0000FF"}}> Sign up </Text> now!
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style = 
                    {(
                        (password== '')||
                        (username == '')
                    ) ? styles.Sign_In_Button_Disabled : styles.Sign_In_Button_Enabled}
                    
                    onPress={() => handleLogin() }
                    //onPress={() => this.props.navigation.navigate("Scan Now")}
                    disabled = {(password== '')||(username == '')}
                >
                    <Text style = {styles.Button_Text}> Log In </Text>
                </TouchableOpacity> 

                <TouchableOpacity
                        style={styles.Facebook_Button}
                        //onPress={() => this.props.navigation.navigate("Facebook Screen")}
                        onPress={() =>  navigation.navigate("Facebook Screen")}
                    >
                        <Text style = {styles.Button_Text_Facebook}> Facebook Login </Text>
                    </TouchableOpacity>

                {/* <TouchableOpacity
                    style = {styles.FB_Button}
                    
                    onPress={() => handleFBLogin() }
                >
                    <Text style = {styles.Button_Text}> Log In with Facebook</Text>
                </TouchableOpacity>  */}


                <TouchableOpacity
                    style = {styles.Google_Button}
                    
                    onPress={() => handleGoogleLogin() }
                >
                    <Text style = {styles.Button_Text_Google}> Log In with Google</Text>
                </TouchableOpacity>   
            </View>
        </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    Instructions: {
        textAlign: 'center',
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

    Key_In_Username: {
        height: 50, 
        width : 300,
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop: 25,
        marginBottom: 25,
    },

    Key_In_Password: {
        height: 50, 
        width : 300,
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop: 25,
        marginBottom: 25,
    },

    Navigation_Text: {
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 5
    },

    Sign_In_Button_Disabled: {
        backgroundColor : '#800000',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Sign_In_Button_Enabled: {
        backgroundColor : '#000080',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Facebook_Button: {
        backgroundColor : '#000080',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Google_Button: {
        backgroundColor : '#A0A0A0',
        borderRadius : 4,
        height: 52,
        width : 300,
        marginTop: 25,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    Button_Text_Facebook: {
        color: "#FFF",
        fontWeight: "600"
    },

    Button_Text_Google: {
        color: "#000",
        fontWeight: "600"
    }
});

export default LoginScreen;


