import React, {Component} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Header from '../layouts/Header';

export default class Landing extends Component {
  static navigationOptions = {
    header: null,
  };

  handleLogin = () => {
    this.props.navigation.navigate('Login');
  };
  handleRegister = () => {
    this.props.navigation.navigate('Register');
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
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={this.handleLogin}
              style={styles.signUpBtn}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: '#091B37',
                }}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.handleRegister}
              style={styles.signUpBtn}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: '#091B37',
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  signUpBtn: {
    width: '30%',
    height: '30%',
    borderRadius: 35,
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    margin: 10,
    backgroundColor: '#ffffff', // invisible color
  },
});
