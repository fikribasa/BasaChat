import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from '../layouts/Header';

const Maps = props => {
  return (
    <SafeAreaView>
      <Header />
      <Text>Maps</Text>

      <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
        <Text>This is Where you should find your Friend's location</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Maps;
