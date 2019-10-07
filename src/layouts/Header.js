import React from 'react';
import {TouchableOpacity, StatusBar, Text, Image, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hamburger from '../assets/icon/menu-24px.svg';

const Header = props => {
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        alignContent: 'center',
        paddingTop: 40,
        backgroundColor: 'grey',
        marginBottom: 10,
        paddingBottom: 10,
      }}>
      <TouchableOpacity
        onPress={() => props.navigation.openDrawer()}
        style={{paddingHorizontal: 30}}>
        <Hamburger width={40} height={40} color={'white'} />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>BasaChat</Text>
      </View>

      <StatusBar translucent backgroundColor="transparent" />
    </SafeAreaView>
  );
};

export default withNavigation(Header);
