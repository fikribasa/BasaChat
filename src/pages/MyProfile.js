import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from '../layouts/Header';

const MyProfile = props => {
  return (
    <SafeAreaView>
      <Header />
      <Text>MyProfile</Text>
      <Text>This is Where you should find your cool own profile</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
        <Text>
          this is where you can edit your profile image, name, password, also
          logout button here
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyProfile;
