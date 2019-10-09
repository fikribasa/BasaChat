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
  ImageBackground,
  StatusBar,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import styles from '../constant/styles';
import {Database, Auth} from '../constant/config';
import SafeAreaView from 'react-native-safe-area-view';
import {Icon} from 'react-native-elements';

import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import uuid from 'uuid/v4'; // Import UUID to generate UUID
import * as firebase from 'firebase/app';
import 'firebase/storage';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class MyProfile extends Component {
  static navigationOptions = {
    title: ' Profile',
  };
  state = {
    permissionsGranted: null,
    errorMessage: null,
    loading: false,
    updatesEnabled: false,
    location: {},
    photo: null,
    _takedPhotoUri: null,
    imageUri: null,
    imgSource: '',
    uploading: false,
    progress: 0,
    images: [],
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
        this.props.navigation.navigate('Landing');
      })
      .catch(error => this.setState({errorMessage: error.message}));
    // Alert.alert('Error Message', this.state.errorMessage);
  };

  hasReadPermission = async () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]).then(result => {
        if (
          result['android.permission.READ_EXTERNAL_STORAGE'] &&
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
        ) {
          this.setState({
            permissionsGranted: true,
          });
        } else if (
          result['android.permission.READ_EXTERNAL_STORAGE'] ||
          result['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            'never_ask_again'
        ) {
          this.refs.toast.show(
            'Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue',
          );
        }
      });
    }
  };

  /////////////////// select image method

  handleChoosePhoto = () => {
    ImagePicker.showImagePicker(options, resp => {
      if (resp.didCancel) {
        ToastAndroid.show('You Cancelled Image Picker!', ToastAndroid.LONG);
      } else if (resp.error) {
        ToastAndroid.show('An error occured', ToastAndroid.LONG);
      } else {
        const source = {uri: resp.uri};
        this.setState({
          imgSource: source,
          imageUri: resp.uri,
        });
        console.log(this.state.imageUri);
      }
    });
  };
  /////////////////////uploadimagemethod
  uploadImage = () => {
    const ext = this.state.imageUri.split('.').pop(); ///Remove extension image
    const filename = `${uuid()}.${ext}`; ////generate unique name
    this.setState({uploading: true});
    firebase
      .storage()
      .ref(`avatar/${filename}`)
      .putfile(this.state.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100, ///calculate progress in percent
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            const allImages = this.state.images;
            allImages.push(snapshot.downloadURL);
            state = {
              ...state,
              uploading: false,
              imgSource: '',
              imageUri: '',
              progress: 0,
              images: allImages,
            };
            AsyncStorage.setItem('images', JSON.stringify(allImages));
          }
          this.setState(state);
        },
        error => {
          unsubscribe();
          ToastAndroid.show('Sorry, try again.', ToastAndroid.LONG);
        },
      );
  };

  render() {
    const {uploading, imgSource, progress, images} = this.state;
    const windowWidth = Dimensions.get('window').width;
    const disabledStyle = uploading ? styles.disabledBtn : {};
    const actionBtnStyles = [styles.btn, disabledStyle];
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
                onPress={this.handleChoosePhoto}>
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

            {/** Display selected image */}
            {imgSource !== '' && (
              <View>
                <Image source={imgSource} style={styles.image} />
                {uploading && (
                  <View style={[styles.progressBar, {width: `${progress}%`}]} />
                )}
                <TouchableOpacity
                  style={actionBtnStyles}
                  onPress={this.uploadImage}
                  disabled={uploading}>
                  <View>
                    {uploading ? (
                      <Text style={styles.btnTxt}>Uploading ...</Text>
                    ) : (
                      <Text style={styles.btnTxt}>Upload image</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}
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
