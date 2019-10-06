import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
// import {Home, Profile, Splash, Register, } from '../pages';
import {createStackNavigator} from 'react-navigation-stack';

import {createDrawerNavigator} from 'react-navigation-drawer';
import React, {Component} from 'react';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Splash from '../pages/Splash';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import MyProfile from '../pages/MyProfile';
import Maps from '../pages/Maps';
import Chat from '../pages/Chat';
import Contacts from '../pages/Contacts';

const LandingStack = createStackNavigator(
  {
    Landing: {
      screen: Landing,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
  },
  {
    headerMode: 'none',
  },
);

class Hidden extends React.Component {
  render() {
    return null;
  }
}

const MainDrawer = createDrawerNavigator(
  {
    Home: {screen: Home},
    Contacts: {screen: Contacts},
    MyProfile: {screen: MyProfile},
    Profile: {
      screen: Profile,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    Maps: {
      screen: Maps,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        drawerLabel: <Hidden />,
      },
    },
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    drawerWidth: 200,
    drawerBackgroundColor: '#333333',
    contentOptions: {
      activeTintColor: '#ffffff',
      inactiveTintColor: '#000000',
      activeBackgroundColor: '#ff5500',
      inactiveBackgroundColor: '#ffffff',
      itemsContainerStyle: {
        marginTop: 20,
      },
      itemStyle: {
        marginTop: 10,
      },
      labelStyle: {
        fontSize: 16,
      },
      iconContainerStyle: {
        backgroundColor: '#000000',
      },
    },
  },
);

const MainStack = createStackNavigator(
  {
    Home: {screen: MainDrawer},
    Chat: {screen: Chat},
    Contacts: {screen: Contacts},
    Profile: {screen: Profile},
    Maps: {screen: Maps},
  },
  {headerMode: 'none'},
);

const Router = createSwitchNavigator({
  Splash: {
    screen: Splash,
  },
  LandingStack: {
    screen: LandingStack,
  },

  MainStack: {
    screen: MainStack,
  },
});
export default createAppContainer(Router);
