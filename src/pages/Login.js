import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

// import {login} from '../public/redux/actions/user';

import {withNavigation} from 'react-navigation';

class Login extends Component {
  state = {
    email: '',
    password: '',

    user: {
      id: '',
      name: '',
      email: '',
    },
    token: '',
  };

  toRegister = () => {
    this.props.navigation.navigate('Register');
  };

  inputHandler = (name, value) => {
    this.setState(() => ({[name]: value}));
  };

  login = async () => {
    // if (this.state.email !== '' && this.state.password !== '') {
    //   await this.props.dispatch(login(this.state));

    //   if (this.props.user == null) {
    //     alert('Wrong email or password!');
    //   } else {
    //     AsyncStorage.setItem('userName', this.props.user.name);
    //     AsyncStorage.setItem('id', this.props.user.id.toString());
    //     AsyncStorage.setItem('userEmail', this.props.user.email);
    //     AsyncStorage.setItem('userLevel', this.props.user.level.toString());
    //     AsyncStorage.setItem('token', this.props.token);

    //     await AsyncStorage.getItem('userName').then(value => {
    //       if (value !== null) {
    //         this.setState({user: {...this.state.user, name: value}});
    //       }
    //     });

    //     await AsyncStorage.getItem('id').then(value => {
    //       if (value !== null) {
    //         value = parseInt(value);
    //         this.setState({user: {...this.state.user, id: value}});
    //       }
    //     });

    //     await AsyncStorage.getItem('userEmail').then(value => {
    //       if (value !== null) {
    //         this.setState({user: {...this.state.user, email: value}});
    //       }
    //     });
    //     await AsyncStorage.getItem('userLevel').then(value => {
    //       if (value !== null) {
    //         value = parseInt(value);
    //         this.setState({user: {...this.state.user, level: value}});
    //       }
    //     });

    //     await AsyncStorage.getItem('token').then(value => {
    //       if (value !== null) {
    //         this.setState({token: value});
    //       }
    //     });

    // console.log('state', this.state);

    // const header = {headers: {authorization: 'Bearer ' + this.state.token}};

    // await this.props.dispatch(getWishlist(this.state.user.id, header));
    // await this.props.dispatch(getCart(this.state.user.id, header));

    // await this.props.dispatch(
    //   getUserTransactions(this.state.user.id, header),
    // );

    this.props.navigation.navigate('Home');
    //   }
    // } else {
    //   alert("Email and password can't be empty");
    // }
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
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            color: '#091B37',
            marginVertical: 10,
            fontWeight: '900',
          }}>
          SIGN IN
        </Text>
        <View style={{alignItems: 'center'}}>
          <TextInput
            name="email"
            placeholder="Email"
            style={styles.textInput}
            placeholderTextColor="grey"
            onChangeText={txt => this.inputHandler('email', txt)}
          />
          <TextInput
            name="password"
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry={true}
            placeholderTextColor="grey"
            onChangeText={txt => this.inputHandler('password', txt)}
          />
        </View>
        <TouchableOpacity style={styles.signInBtn} onPress={this.login}>
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
      </View>
    );
  }
}

export default withNavigation(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
