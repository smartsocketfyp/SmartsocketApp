import React, { Component } from 'react';
// import '../App.css';
// import style from './AppStyle.js';
// import { useEffect } from "react";
import Facebook from '../components/Facebook';
// import { useNavigation } from '@react-navigation/native';

export default class FacebookScreen extends Component {
  constructor(props){
    super(props);
    this.props.navigation.navigate('Scan Now');
  }
  render (){
   return (
   <div className="App">
      <Facebook />
  </div>
   );
}
}