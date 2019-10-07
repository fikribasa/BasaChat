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
  componentDidMount = async () => {
    let firebaseConfig = {
      apiKey: 'AIzaSyCm5gJORap8XfQDGalEC58xNUi2PTkP5io',
      authDomain: 'basa-chat.firebaseapp.com',
      databaseURL: 'https://basa-chat.firebaseio.com',
      projectId: 'basa-chat',
      storageBucket: 'basa-chat.appspot.com',
      messagingSenderId: '39799028396',
      appId: '1:39799028396:web:e9eeeb4a7e5c715a8ffd09',
    };

    if (!firebase.apps.length) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }
    await Auth.onAuthStateChanged(user => {
      setInterval(
        () =>
          this.props.navigation.navigate(user ? 'MainStack' : 'LandingStack'),
        1000,
      );
    });
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
