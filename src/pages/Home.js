import React, {Component} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Header from '../layouts/Header';
import {withNavigation} from 'react-navigation';

const USAGE = [
  {
    id: '1',
    date: '28 Sep 2019 16:02:06',
    type: 'Usage',
    price: 50,
  },
  {
    id: '2',
    date: '27 Sep 2019 16:02:06',
    type: 'Usage',
    price: 50,
  },
  {
    id: '3',
    date: '25 Sep 2019 16:02:06',
    type: 'Usage',
    price: 25,
  },
];

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
