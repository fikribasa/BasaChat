import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from '../layouts/Header';
import {withNavigation} from 'react-navigation';

const Home = props => {
  return (
    <SafeAreaView>
      <Header />
      <Text>Home</Text>
      <Text>This is Where you should find your chat history</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Chat')}>
        <Text>
          If you click this icoon you sould be directed to chatpage, kalau bisa
          diswipe list maka muncul pilihan untuk menghapus pesan
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default withNavigation(Home);
