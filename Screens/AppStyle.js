import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// const LotsOfStyles = () => {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.red}>just red</Text>
//         <Text style={styles.bigBlue}>just bigBlue</Text>
//         <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
//         <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
//       </View>
//     );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 50,
//   },
//   bigBlue: {
//     color: 'blue',
//     fontWeight: 'bold',
//     fontSize: 30,
//   },
//   red: {
//     color: 'red',
//   },
// });

// export default LotsOfStyles;

// app.css to appstyle.js 
const converted = {
    ".App": { textAlign: "center" },
    ".App-logo": { height: "40vmin", pointerEvents: "none" },
    "@media (prefers-reduced-motion: no-preference)": {
      ".App-logo": { animation: "App-logo-spin infinite 20s linear" }
    },
    ".App-header": {
      backgroundColor: "#282c34",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "calc(10px + 2vmin)",
      color: "white"
    },
    ".App-link": { color: "white" },
    "@keyframes App-logo-spin": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" }
    }
  }