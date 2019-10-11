import React, {Component} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  ToastAndroid,
  ImageBackground,
  StatusBar,
  ScrollView,
} from 'react-native';
import Header from '../layouts/Header';
import firebase from 'firebase';
import {Database, Auth} from '../constant/config';
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('item').name + "'s Profile",
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      person: props.navigation.getParam('item'),
      items: props.navigation.getParam('item'),
    };
  }

  // componentDidMount = async () => {
  //   const userId = await AsyncStorage.getItem('userid');
  //   const userName = await AsyncStorage.getItem('user.name');
  //   const userAvatar = await AsyncStorage.getItem('user.photo');
  //   const userEmail = await AsyncStorage.getItem('user.email');
  //   this.setState({userId, userName, userAvatar, userEmail});
  // };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <Header />
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              paddingTop: 60,
              flex: 1,
              flexDirection: 'column',
              backgroundColor: '#f48023',
              height: 200,
              justifyContent: 'flex-end',
            }}>
            <ImageBackground
              resizeMode="contain"
              style={{
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                alignItems: 'flex-end',
                paddingLeft: 20,
              }}
              source={{
                uri: this.state.person.photo,
              }}></ImageBackground>
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{color: '#f48023', marginVertical: 10, fontSize: 22}}>
              Account
            </Text>
            <Text style={{fontSize: 18}}>{this.state.person.name}</Text>
            <Text style={{fontSize: 12, color: '#99A3A4'}}>
              tap to change Username
            </Text>
            <View style={styles.separator}></View>
            <Text style={{fontSize: 18}}>{this.state.person.email}</Text>
            <Text style={{fontSize: 12, color: '#99A3A4'}}>Email</Text>
            <View style={styles.separator}></View>
            <Text style={{fontSize: 18}}>Bio</Text>
            <Text style={{fontSize: 12, color: '#99A3A4'}}>
              Add a few words about yourself
            </Text>
          </View>
          <View style={styles.bigseparator}></View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{color: '#f48023', marginVertical: 10, fontSize: 22}}>
              Settings
            </Text>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  item: this.state.person,
                })
              }>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 6,
                }}
                source={require('../assets/icon/message.png')}
              />
              <Text style={{fontSize: 18, marginLeft: 20}}>
                Send Message to {this.state.person.name}
              </Text>
            </TouchableOpacity>

            <View style={styles.separator}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 10,
    marginHorizontal: 10,
  },
  bigseparator: {
    height: 10,
    backgroundColor: '#eeeeee',
    marginTop: 10,
  },
  logoutButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  logoutContainer: {
    marginHorizontal: 30,
  },
  btnTxt: {
    color: '#fff',
  },
  image: {
    marginTop: 20,
    minWidth: 200,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#ccc',
  },
  img: {
    flex: 1,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#ccc',
  },
  progressBar: {
    backgroundColor: 'rgb(3, 154, 229)',
    height: 3,
    shadowColor: '#000',
  },
  btn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgb(3, 154, 229)',
    marginTop: 20,
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: 'rgba(3,155,229,0.5)',
  },
});
