import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from '../layouts/Header';

const Profile = () => {
  return (
    <SafeAreaView>
      <Header />
      <View>
        <Text>Friends Profile</Text>
      </View>
      <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
        <Text>
          This is Where you should find your Friend's Profile yg berisi avatar,
          nama, profie
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
