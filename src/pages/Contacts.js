import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from '../layouts/Header';

const Contact = props => {
  return (
    <SafeAreaView>
      <Header />
      <Text>This is Contact Page</Text>
    </SafeAreaView>
  );
};

export default Contact;
