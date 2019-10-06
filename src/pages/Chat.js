import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from '../layouts/Header';
import {withNavigation} from 'react-navigation';

const Chat = props => {
  return (
    <SafeAreaView>
      <Header />
      <Text>Chat</Text>
      <Text>This is Where you should find your chat with your Friend</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
        <Text>
          this is where you should write your message to your Friend, kalau di
          klik header maka seharusnya masuk ke halaman profile
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default withNavigation(Chat);
