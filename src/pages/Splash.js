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
import {black} from 'ansi-colors';

class Splash extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }
  componentDidMount = () => {
    ///////ambil token buat cek bareng header
    // await AsyncStorage.getItem('token').then(value => {
    //   if (value !== null) {
    //     this.setState({token: value});
    //   }
    // });
    // const header = {headers: {authorization: 'Bearer ' + this.state.token}};
    // this.setState({header: header});
    ////////
    setTimeout(() => {
      this.setTimePassed();
    }, 2000);
  };
  setTimePassed = () => {
    this.props.navigation.navigate('LandingStack');
  };

  //   setTimePassed = () => {
  //     this.state.isAuthenticated
  //       ? this.props.navigation.navigate('Home')
  //       : this.props.navigation.navigate('Login');
  //   };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: black}}>
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
