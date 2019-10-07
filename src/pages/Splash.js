import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {Auth} from '../constant/config';
import firebase from 'firebase';

class Splash extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }
  componentDidMount = async () => {
    // let firebaseConfig = {
    //   apiKey: 'AIzaSyCepvPNPIurU2gzXF0Pt5IA2sf3YXhdIu4',
    //   authDomain: 'geochat-252415.firebaseapp.com',
    //   databaseURL: 'https://geochat-252415.firebaseio.com',
    //   projectId: 'geochat-252415',
    //   storageBucket: 'geochat-252415.appspot.com',
    //   messagingSenderId: '408297810709',
    //   appId: '1:408297810709:web:f7460ce49018d35a54971c',
    // };

    // if (!firebase.apps.length) {
    //   // Initialize Firebase
    //   firebase.initializeApp(firebaseConfig);
    // }
    // await Auth.onAuthStateChanged(user => {
    //   setInterval(
    //     () =>
    //       this.props.navigation.navigate(user ? 'MainStack' : 'LandingStack'),
    //     1000,
    //   );
    // });
    setTimeout(() => {
      this.setTimePassed();
    }, 2000);
  };
  setTimePassed = () => {
    this.props.navigation.navigate('LandingStack');
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground
          source={require('../assets/backgrund/splash-bg.jpg')}
          style={{resizeMode: 'cover', height: '100%', width: '100%'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              flex: 1,
            }}>
            <Image
              source={require('../assets/icon/iconchat.png')}
              style={{width: '60%', height: '60%', resizeMode: 'contain'}}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
export default Splash;
