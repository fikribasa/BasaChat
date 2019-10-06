import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from '../layouts/Header';

const Landing = props => {
  return (
    <SafeAreaView>
      <Text>This is Landing Page</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Login')}
        style={{backgroundColor: 'yellow'}}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Register')}
        style={{backgroundColor: 'green'}}>
        <Text>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Landing;
