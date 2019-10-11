import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Splash from '../pages/Splash';
import Profile from '../pages/FriendProfile';
import Home from '../pages/Home';
import MyProfile from '../pages/MyProfile';
import Chat from '../pages/Chat';
import Contact from '../pages/Contacts';

const DrawerContent = props => {
  return (
    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 20,

          height: '40%',
        }}>
        <View
          style={{
            flex: 60,
            backgroundColor: '#f48023',
            justifyContent: 'flex-end',
          }}>
          <Image
            style={{width: 181, height: 132}}
            source={require('../assets/icon/iconchat.png')}
          />
        </View>
      </View>
      <DrawerNavigatorItems {...props} />
    </SafeAreaView>
  );
};

const AppStack = createStackNavigator(
  {
    Home: Home,
    Chat: Chat,
  },
  {},
);

const ChatStack = createStackNavigator(
  {
    Friend: Contact,
    FriendProfile: Profile,
    Chat: Chat,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const DrawerStack = createDrawerNavigator(
  {
    ListChat: {
      screen: ChatStack,
      navigationOptions: {
        drawerLabel: 'Chat',
      },
    },
    Home: {
      screen: AppStack,
      navigationOptions: {
        drawerLabel: 'Find Friends',
      },
    },

    Profile: {
      screen: MyProfile,
      navigationOptions: {
        drawerLabel: 'Setting',
      },
    },
  },
  {
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: '#f48023',
      inactiveTintColor: 'grey',

      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);
const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({header: null}),
    },
    Register: {
      screen: Register,
      navigationOptions: ({navigation}) => ({header: null}),
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const AppRoot = createAppContainer(
  createSwitchNavigator(
    {Splash: Splash, Landing: Landing, App: DrawerStack, Auth: AuthStack},
    {
      headerMode: 'none',
    },
  ),
);

const Router = () => {
  return <AppRoot />;
};

export default Router;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerHeader: {
    height: 200,
    backgroundColor: 'white',
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
});
