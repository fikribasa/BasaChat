import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
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
import Maps from '../pages/Maps';
import Chat from '../pages/Chat';
import Contact from '../pages/Contacts';

// class Hidden extends Component {
//   render() {
//     return null;
//   }
// }

// const MainDrawer = createDrawerNavigator(
//   {
//     Maps: {screen: Maps},
//     Chat: {
//       screen: Chat,
//       navigationOptions: {
//         drawerLabel: <Hidden />,
//       },
//     },
//     Contact: {screen: Contact},
//     MyProfile: {screen: MyProfile},
//     Profile: {screen: Profile, navigationOptions: {drawerLabel: <Hidden />}},
//   },
//   {
//     initialRouteName: 'Maps',
//     drawerPosition: 'left',
//     drawerWidth: 200,
//     drawerBackgroundColor: '#333333',
//     contentOptions: {
//       activeTintColor: '#ffffff',
//       inactiveTintColor: '#000000',
//       activeBackgroundColor: '#ff5500',
//       inactiveBackgroundColor: '#ffffff',
//       itemsContainerStyle: {
//         marginTop: 20,
//       },
//       itemStyle: {
//         marginTop: 10,
//       },
//       labelStyle: {
//         fontSize: 16,
//       },
//       iconContainerStyle: {
//         backgroundColor: '#000000',
//       },
//     },
//   },
// );

// //
// const AuthStack = createStackNavigator({
//   Welcome: {
//     screen: Landing,
//     navigationOptions: ({navigation}) => ({header: null}),
//   },
//   Login: {screen: Login, navigationOptions: ({navigation}) => ({header: null})},
//   Register: {
//     screen: Register,
//     navigationOptions: ({navigation}) => ({header: null}),
//   },
//   Home: {screen: MainDrawer},
// });

// const AppContainer = createAppContainer(
//   createSwitchNavigator(
//     {
//       AuthLoading: Splash,
//       App: MainDrawer,
//       Auth: AuthStack,
//     },
//     {
//       initialRouteName: 'AuthLoading',
//     },
//   ),
// );

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

const ChatStack = createStackNavigator({
  Friend: Contact,
  Chat: Chat,
});
const HomeBottom = createDrawerNavigator(
  {
    Home: {
      screen: AppStack,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },
    ListChat: {
      screen: ChatStack,
      navigationOptions: {
        tabBarLabel: 'Chat',
      },
    },
    Profile: {
      screen: MyProfile,
      navigationOptions: {
        tabBarLabel: 'Profile',
      },
    },
  },
  {
    contentComponent: DrawerContent,

    tabBarOptions: {
      activeTintColor: '#5ba4e5',
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
const AuthStack = createStackNavigator({
  Landing: {screen: Landing},
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({header: null}),
  },
  Register: {
    screen: Register,
    navigationOptions: ({navigation}) => ({header: null}),
  },
  Home: {
    screen: HomeBottom,
  },
});

const AppRoot = createAppContainer(
  createSwitchNavigator(
    {
      Splash: Splash,
      Auth: AuthStack,
      App: HomeBottom,
    },
    {
      initialRouteName: 'Splash',
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
