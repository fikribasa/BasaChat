import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Home, Profile} from '../pages';
import {createStackNavigator} from 'react-navigation-stack';
import {DrawerNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import React, {Component} from 'react';

// const RouterStack = createStackNavigator(
//   {

//     Home,
//     Profile,
//   },
//   {initialRouteName: 'Home'},
// );

// class Router extends Component {
//   render() {
//     return <DrawerStack />;
//   }
// }

const Router = createDrawerNavigator(
  {
    Home,
    Profile,
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

export default createAppContainer(Router);
