import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  StatusBar,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import {Database, Auth} from '../constant/config';

export default class Login extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      email: '',
      password: '',
    };
  }
  componentDidMount = async () => {
    this._isMounted = true;
    await this.getLocation();
  };

  componentWillUnmount() {
    this._isMounted = false;
    Geolocation.clearWatch();
    Geolocation.stopObserving();
  }

  toRegister = () => {
    this.props.navigation.navigate('Register');
  };

  inputHandler = (name, value) => {
    this.setState(() => ({[name]: value}));
  };

  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location Permission Denied By User.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location Permission Revoked By User.',
        ToastAndroid.LONG,
      );
    }
    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({loading: true}, () => {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
          });
        },
        error => {
          this.setState({errorMessage: error});
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 8000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    });
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  submitForm = async () => {
    const {email, password} = this.state;
    if (email.length < 6) {
      ToastAndroid.show(
        'Please input a valid email address',
        ToastAndroid.LONG,
      );
    } else if (password.length < 6) {
      ToastAndroid.show(
        'Password must be at least 6 characters',
        ToastAndroid.LONG,
      );
    } else {
      Database.ref('user/')
        .orderByChild('/email')
        .equalTo(email)
        .once('value', result => {
          let data = result.val();
          if (data !== null) {
            let user = Object.values(data);

            AsyncStorage.setItem('user.email', user[0].email);
            AsyncStorage.setItem('user.name', user[0].name);
            AsyncStorage.setItem('user.photo', user[0].photo);
          }
        });
      Auth.signInWithEmailAndPassword(email, password)
        .then(async response => {
          Database.ref('/user/' + response.user.uid).update({
            status: 'Online',
            latitude: this.state.latitude || null,
            longitude: this.state.longitude || null,
          });
          // AsyncStorage.setItem('user', response.user);
          await AsyncStorage.setItem('userid', response.user.uid);
          await AsyncStorage.setItem('user', response.user);
          ToastAndroid.show('Login success', ToastAndroid.LONG);
          await this.props.navigation.navigate('App');
        })
        .catch(error => {
          this.setState({
            errorMessage: error.message,
            email: '',
            password: '',
          });
          ToastAndroid.show(this.state.errorMessage, ToastAndroid.LONG);
        });
      // Alert.alert('Error Message', this.state.errorMessage);
    }
  };
  _toastWithDurationGravityOffsetHandler = () => {
    //function to make Toast With Duration, Gravity And Offset
    ToastAndroid.showWithGravityAndOffset(
      `Hi, Welcome '${this.state.user.name}'`,
      ToastAndroid.LONG, //can be SHORT, LONG
      ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
      25, //xOffset
      50, //yOffset
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground
          source={require('../assets/backgrund/landing.jpg')}
          style={{resizeMode: 'cover', height: '100%', width: '100%'}}>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              color: 'white',
              marginTop: 170,
              fontWeight: '900',
              marginBottom: 30,
            }}>
            SIGN IN
          </Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              name="email"
              placeholder="Email"
              style={styles.textInput}
              placeholderTextColor="grey"
              onChangeText={this.handleChange('email')}
            />
            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              placeholderTextColor="grey"
              onChangeText={this.handleChange('password')}
            />
          </View>
          <TouchableOpacity style={styles.signInBtn} onPress={this.submitForm}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
              }}>
              SIGN IN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#091B37',
              }}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f48023',
  },
  textInput: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingLeft: 10,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(242, 243, 244, 0.8)',
  },
  signInBtn: {
    width: '60%',
    height: 70,
    borderRadius: 35,
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#091B37',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 3,
    elevation: 5,
  },
  signUpBtn: {
    width: '60%',
    height: 70,
    borderRadius: 35,
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: '#ffffff', // invisible color
  },
});
