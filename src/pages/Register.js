/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {withNavigation} from 'react-navigation';
// import {register} from '../public/redux/actions/user';
// import {connect} from 'react-redux';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
    };
  }

  state = {
    name: '',
    email: '',
    password: '',
    register: {},
  };

  toLogin = () => {
    this.props.navigation.navigate('Login');
  };

  inputHandler = (name, value) => {
    this.setState(() => ({[name]: value}));
  };

  register = async () => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    // await this.props.dispatch(register(data));
    // this.setState({register: this.props.register});

    if (this.state.register.error) {
      alert(this.state.register.error);
    } else {
      alert('Register success. \n Welcome to Aneka Music');
      this.props.navigation.navigate('Home');
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            color: '#091B37',
            marginVertical: 30,
          }}>
          SIGN UP
        </Text>
        <View style={{alignItems: 'center'}}>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={txt => this.inputHandler('name', txt)}
          />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={txt => this.inputHandler('email', txt)}
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            placeholderTextColor="black"
            onChangeText={txt => this.inputHandler('password', txt)}
          />
        </View>
        <TouchableOpacity style={styles.signInBtn} onPress={this.register}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'white',
            }}>
            SIGN UP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpBtn} onPress={this.toLogin}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#091B37',
            }}>
            SIGN IN
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5d372',
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
