import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View, Text, TouchableOpacity} from 'react-native';

const Home = props => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
        <Text>SecondPage</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
