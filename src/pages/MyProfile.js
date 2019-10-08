import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ToastAndroid,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
// import styles from '../constant/styles';
import {Database, Auth} from '../constant/config';

export default class MyProfile extends Component {
  static navigationOptions = {
    title: ' Profile',
  };
  state = {
    errorMessage: null,
    loading: false,
    updatesEnabled: false,
    location: {},
  };

  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem('userid');
    const userName = await AsyncStorage.getItem('user.name');
    const userAvatar = await AsyncStorage.getItem('user.photo');
    const userEmail = await AsyncStorage.getItem('user.email');
    this.setState({userId, userName, userAvatar, userEmail});
  };

  handleLogout = async () => {
    const userId = await AsyncStorage.getItem('userid');

    Auth.signOut()
      .then(async () => {
        Database.ref('/user/' + userId).update({
          status: 'Offline',
        });
        await AsyncStorage.clear();
        ToastAndroid.show('Logout success', ToastAndroid.LONG);
        this.props.rootNavigation.navigation.navigate('Splash');
      })
      .catch(error => this.setState({errorMessage: error.message}));
    // Alert.alert('Error Message', this.state.errorMessage);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{alignItems: 'center', marginHorizontal: 30}}>
            <Image
              style={styles.avatarImg}
              source={{
                uri: this.state.userAvatar,
              }}
            />
            <Text style={styles.name}>{this.state.userName}</Text>
            <Text style={styles.email}>{this.state.userEmail}</Text>
            <Text style={styles.description}>User Description</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={this.handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  avatarImg: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: 'bold',
  },
  email: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
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
});
