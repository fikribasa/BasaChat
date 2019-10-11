import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ToastAndroid,
  ImageBackground,
  StatusBar,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Database, Auth} from '../constant/config';
import SafeAreaView from 'react-native-safe-area-view';
import {Icon} from 'react-native-elements';
import firebase from 'firebase';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';

// import firebase from 'react-native-firebase';

export default class MyProfile extends Component {
  static navigationOptions = {
    title: ' Profile',
  };
  state = {
    userId: null,
    permissionsGranted: null,
    errorMessage: null,
    loading: false,
    updatesEnabled: false,
    location: {},
    photo: null,
    imageUri: null,
    imgSource: '',
    uploading: false,
  };

  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem('userid');
    const userName = await AsyncStorage.getItem('user.name');
    const userAvatar = await AsyncStorage.getItem('user.photo');
    const userEmail = await AsyncStorage.getItem('user.email');
    this.setState({userId, userName, userAvatar, userEmail});
  };

  handleLogout = async () => {
    await AsyncStorage.getItem('userid')
      .then(async userid => {
        Database.ref('user/' + userid).update({status: 'Offline'});
        await AsyncStorage.clear();
        Auth.signOut();
        ToastAndroid.show('Logout success', ToastAndroid.LONG);
        // this.props.navigation.navigate('Out');
        this.props.navigation.navigate('Landing');
      })
      .catch(error => this.setState({errorMessage: error.message}));
    // Alert.alert('Error Message', this.state.errorMessage);
  };

  requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])
        return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
        console.log(err);
        return false
    }
}

  changeImage = async type => {
    // console.log(upp)
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
    };

    let cameraPermission =
      (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)) &&
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ) &&
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    if (!cameraPermission) {
      cameraPermission = await this.requestCameraPermission();
    } else {
      ImagePicker.showImagePicker(options, response => {
        ToastAndroid.show(
          'Rest asure, your photo is flying to the shiny cloud',
          ToastAndroid.LONG,
        );
        let uploadBob = null;
        const imageRef = firebase
          .storage()
          .ref('avatar/' + this.state.userId)
          .child('photo');
        fs.readFile(response.path, 'base64')
          .then(data => {
            return Blob.build(data, {type: `${response.mime};BASE64`});
          })
          .then(blob => {
            uploadBob = blob;
            return imageRef.put(blob, {contentType: `${response.mime}`});
          })
          .then(() => {
            uploadBob.close();
            return imageRef.getDownloadURL();
          })
          .then(url => {
            ToastAndroid.show(
              'Your cool avatar is being uploaded, its going back to your phone now',
              ToastAndroid.LONG,
            );
            firebase
              .database()
              .ref('user/' + this.state.userId)
              .update({photo: url});
            this.setState({userAvatar: url});
            AsyncStorage.setItem('user.photo', this.state.userAvatar);
          })

          .catch(err => console.log(err));
      });
    }
  };

  render() {
    const {uploading} = this.state;

    const disabledStyle = uploading ? styles.disabledBtn : {};

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
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
                uri: this.state.userAvatar,
              }}>
              <TouchableOpacity
                style={{
                  right: 'auto',
                  left: 250,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  borderColor: '#E5E7E9',
                  borderWidth: 1,
                  marginBottom: -25,
                }}
                onPress={this.changeImage}>
                <Image
                  source={require('../assets/icon/photoblack.png')}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{color: '#f48023', marginVertical: 10, fontSize: 22}}>
              Account
            </Text>
            <Text style={{fontSize: 18}}>{this.state.userName}</Text>
            <Text style={{fontSize: 12, color: '#99A3A4'}}>
              tap to change Username
            </Text>
            <View style={styles.separator}></View>
            <Text style={{fontSize: 18}}>{this.state.userEmail}</Text>
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
              onPress={this.handleLogout}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../assets/icon/logout.png')}
              />
              <Text style={{fontSize: 18, marginLeft: 20}}>Logout</Text>
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
