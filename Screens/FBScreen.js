import React, { Component } from 'react';
import '../App.css';
import {useEffect} from "react";
import Facebook from '../components/Facebook';

class FacebookScreen extends Component {
  render (){

    // const fbtime = route.params;
    // useEffect(() => {
    //  setTimeout(() => navigation.push('Main Function', fbtime), 1500);
    //  onPress(() => this.props.navigation.push('Main Function', fbtime));
    //  onPress={() => this.props.navigation.navigate('Main Function')};
    // });
    // //onPress={() => this.props.navigation('Main Function')};

   const {navigation} = this.props.navigation.navigate('Main Function');
   return (
   <div className="App">
      <Facebook />
  </div>
   );
}
}

export default FacebookScreen;
