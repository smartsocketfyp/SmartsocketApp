import * as React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Import Screens
import CameraScreen from './Screens/CameraScreen'
import ConnectedScreen from './Screens/ConnectedScreen'
import EmailVerificationScreen from './Screens/EmailVerificationScreen'
import ForgetPasswordScreen from './Screens/ForgetPasswordScreen'
import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import MainFunctionScreen from './Screens/MainFunctionScreen'
import NotConnectedScreen from './Screens/NotConnectedScreen'
import PasswordResetScreen from './Screens/PasswordResetScreen'
import PastUsageScreen from './Screens/PastUsageScreen'
import PowerUsageScreen from './Screens/PowerUsageScreen'
import OnOffScreen from './Screens/OnOffScreen'
import ResetPasswordScreen from './Screens/ResetPasswordScreen'
import ResetVerificationScreen from './Screens/ResetVerificationScreen'
import ScanNowScreen from './Screens/ScanNowScreen'
import SchedulingCountdownTimerScreen from './Screens/SchedulingCountdownTimerScreen'
import SchedulingSetTimerScreen from './Screens/SchedulingSetTimerScreen'
import SchedulingTimesUpScreen from './Screens/SchedulingTimesUpScreen'
import SignUpScreen from './Screens/SignUpScreen'
import VerificationScreen from './Screens/VerificationScreen'

//Firebase Configuration//
const firebaseConfig = {
  apiKey: "AIzaSyA1A-1dRzIT-ZRUKkmLhroKnFfZZ6M5QaI",
  authDomain: "smart-socket-trial-e6ec8.firebaseapp.com",
  databaseURL: "https://smart-socket-trial-e6ec8.firebaseio.com",
  projectId: "smart-socket-trial-e6ec8",
  storageBucket: "smart-socket-trial-e6ec8.appspot.com",
  messagingSenderId: "1094436654426",
  appId: "1:1094436654426:web:c4f8d4731eef908ae87763",
  measurementId: "G-5MM7JDNS8Y"
};

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">        
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Forget Password" component={ForgetPasswordScreen} />
        <Stack.Screen name="Password Reset" component={PasswordResetScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Email Verification" component={EmailVerificationScreen} />
        <Stack.Screen name="Scan Now" component={ScanNowScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Connected" component={ConnectedScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Not Connected" component={NotConnectedScreen} />
        <Stack.Screen name="Main Function" component={MainFunctionScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="On Off" component={OnOffScreen} />
        <Stack.Screen name="Set Timer" component={SchedulingSetTimerScreen} />
        <Stack.Screen name="Countdown" component={SchedulingCountdownTimerScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Times Up" component={SchedulingTimesUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Power Usage" component={PowerUsageScreen} />
        <Stack.Screen name="Past Usage" component={PastUsageScreen} />
        
        <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
        <Stack.Screen name="Reset Verification" component={ResetVerificationScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
export default App;

