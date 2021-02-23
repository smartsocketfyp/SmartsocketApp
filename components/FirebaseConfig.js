import * as React from 'react';
import { useEffect} from 'react';
import {useState} from 'react';
import {Component} from 'react';
import CountDown from 'react-native-countdown-component';
import NumericInput from 'react-native-numeric-input';
import { StyleSheet, TouchableOpacity, Button, View, Text, TextInput, StatusBar, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
 
const AuthContext = React.createContext();
 
// Home Screen //
function Home_Screen({ navigation }) {
  return (
    <ScrollView>
    <View style={{ flex: 1,  alignItems: 'center', marginTop: 200, marginBottom: 100}}>
      <Text> WELCOME TO AILY </Text>  

    <View style={{ flex: 1, justifyContent: 'center', marginTop: 40, marginBottom: 20 }}>
      <Button
        title="Log In"
        onPress={() => navigation.navigate('Log In')}
      />
    <View style={{ flex: 1, justifyContent: 'center', marginTop: 40, marginBottom: 40 }}>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Sign Up')}
      />
    </View>  
    </View>
    </View>
    </ScrollView>
  );
}
 
// Log In //
function Log_In({ navigation }) {
  const [username, setusername] = React.useState('');
  const [password, setpassword] = React.useState('');

  return (
    <ScrollView>
    <View style={{ flex: 1, justifyContent: 'center', marginTop: 250, marginBottom: 10 }}>
<TextInput
        placeholder="Username"
        value={username}
        onChangeText={setusername}
      />
       <View style={{ flex: 1, justifyContent: 'center', marginTop:40, marginBottom: 10 }}>

<TextInput
        placeholder="Password"
        value={password}
        onChangeText={setpassword}
        secureTextEntry
      />
      <View style={{ flex: 1, justifyContent: 'center', marginBottom: 10 }}>
      <Button disabled = {(password== '')||(username == '')} title="Sign In" 
      onPress={() => navigation.push('Scan Now', password)}
      />
      </View>
    </View>
    </View>
    </ScrollView>
  );
}
 
// Sign Up //
function Sign_Up({ navigation }) {
  const [fullname, setfullname] = React.useState('');
  const [username, setusername] = React.useState('');
  const [emailPhonenumber, setemailPhonenumber] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [confirmpassword, setconfirmpassword] = React.useState('');

  return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: 'center', marginTop: 150, marginBottom: 30 }}>
      <Text>Fill IN THE DETAILS BELOW</Text>

      <View style={{ flex: 1, justifyContent: 'center', marginTop:40, marginBottom: 10 }}>    
      
      <TextInput
        placeholder="Full Name*"
        value={fullname}
        onChangeText={setfullname}
      />
      <View style={{ flex: 1, justifyContent: 'center', marginTop:40, marginBottom: 10 }}>
      <TextInput
        placeholder="Username*"
        value={username}
        onChangeText={setusername}
      />
      <View style={{ flex: 1, justifyContent: 'center', marginTop:40, marginBottom: 10 }}>
      <TextInput
        placeholder="Email or Phone Number"
        value={emailPhonenumber}
        onChangeText={setemailPhonenumber}
      />
      <View style={{ flex: 1, justifyContent: 'center', marginTop:40, marginBottom: 10 }}>
      <TextInput
        placeholder="Password*"
        value={password}
        onChangeText={setpassword}
        secureTextEntry
      />
      <View style={{ flex: 1, justifyContent: 'center',marginTop:40, marginBottom: 10 }}>
      <TextInput
        placeholder="Confirm Password*"
        value={confirmpassword}
        onChangeText={setconfirmpassword}
        secureTextEntry
      />
      <View style={{ flex: 1, justifyContent: 'center', marginTop:40, marginBottom: 10 }}>
      <Button
        disabled = {(fullname == '')||(username == '')||(emailPhonenumber == '')||(password == '')||(confirmpassword == '')||(password != confirmpassword)} title="Sign Up Now"
        onPress={() => navigation.navigate('Verification Page')}
      />
      </View>
      </View>
      </View>
      </View>
      </View>
      </View>
    </View>
    </ScrollView>
  );
}
 
// Verification //
function Verification({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Verification</Text>
      <Button
        title="Code"
        onPress={() => navigation.navigate('Scan Now')}
      />
    </View>
  );
}
 
// Scan Now //
function Scan_Now({route, navigation }) {
    console.warn(route)
    let password = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Scan Now</Text>
        
        <Button
          title="Scan Now"
          onPress={() => navigation.navigate('Camera')}
        />
 
        <Text style = {{fontSize: 30}} > {password} </Text>
      </View>
    );
}
 
// Camera //
function Camera({ navigation }) {
  return (
    <View style={{backgroundColor: '#90FF33', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Camera</Text>
      <Button
        title="Connected"
        onPress={() => navigation.navigate('Connected')}
      />
    </View>
  );
}
 
// Connected //
function Connected({ navigation }) {
  useEffect(() => {
    setTimeout(() => navigation.navigate('Main_Function'), 1500);
  });
  
  return (
    <View style={{ backgroundColor: '#90FF33', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>You are connected</Text>
    </View>
  );
}
 
// Main Function //
function Main_Function({ navigation }) {
  return (
    <View style={{ backgroundColor: '#90FF33', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>Main Function</Text>
 
      <Button
        title="On Off"
        onPress={() => navigation.navigate('On Off')}
      />
 
      <Button
        title="Scheduling"
        onPress={() => navigation.navigate('Set Timer')}
      />
    </View>
  );
}
 
// On Off //
function On_Off({ navigation }) {
  return (
    <View style={{ backgroundColor: '#90FF33', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>Switch On or Switch Off socket</Text>
 
      <Button
        title="On_Off"
        onPress={() => navigation.navigate('Main_Function')}
      />
    </View>
  );
}
 
// Scheduling Set Timer //
function Scheduling_Set_Timer({ navigation }) {
  const [Text_Minutes, setText_Minutes] = React.useState('');
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>Set Timer</Text>
 
      <Text> Minutes:</Text>
      <TextInput
          value={Text_Minutes}
          onChangeText={setText_Minutes}
          keyboardType = {'numeric'}
      />
      
 
      <Button
        title="Start Now"
        onPress={() => navigation.push('Countdown Timer', Text_Minutes)}
      />
    </View>
  );
}
 
// Scheduling Countdown Timer //
function Scheduling_Countdown_Timer({ route, navigation }) {
  console.warn(route)
  let Text_Minutes = route.params;
  return (
    <View style={{ backgroundColor: '#90FF33', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>Countdown Timer</Text>
      <Text style = {{fontSize: 30}} > {Text_Minutes} </Text>
 
      <CountDown
        size={30}
        until={Text_Minutes*60}
        onFinish={() => alert('Finished') > navigation.navigate('Times Up')}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
 
      <Button
        title="Stop Now"
        onPress={() => navigation.navigate('Times Up')}
      />
    </View>
  );
}
 
// Scheduling Times Up //
function Scheduling_Times_Up({ navigation }) {
  return (
    <View style={{ backgroundColor: '#90FF33', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>Times Up </Text>
 
      <Button
        title="Main_Function"
        onPress={() => navigation.navigate('Main_Function')}
      />
    </View>
  );
}
 
const Stack = createStackNavigator();
 
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home_Screen} />
        <Stack.Screen name="Log In" component={Log_In} />
        <Stack.Screen name="Sign Up" component={Sign_Up} />
        <Stack.Screen name="Verification Page" component={Verification} />
        <Stack.Screen name="Scan Now" component={Scan_Now} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Connected" component={Connected} />
        <Stack.Screen name="Main_Function" component={Main_Function} />
        <Stack.Screen name="On Off" component={On_Off} />
        <Stack.Screen name="Set Timer" component={Scheduling_Set_Timer} />
        <Stack.Screen name="Countdown Timer" component={Scheduling_Countdown_Timer} />
        <Stack.Screen name="Times Up" component={Scheduling_Times_Up} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
export default App;