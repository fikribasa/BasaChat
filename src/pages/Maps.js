import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ToastAndroid,
  Platform,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import styles from '../constant/styles';
import {Database} from '../constant/config';
import SafeAreaView from 'react-native-safe-area-view';
import Header from '../layouts/Header';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Maps extends Component {
  constructor(props) {
    super(props);

    state = {
      initial: 'state',
      mapRegion: null,
      latitude: 0,
      longitude: 0,
      userList: [],
      uid: null,
    };
  }
  componentDidMount = async () => {
    await this.getUser();
    await this.getLocation();
    // const uid = await AsyncStorage.getItem('userid');
  };

  getUser = async () => {
    const uid = await AsyncStorage.getItem('userid');
    this.setState({uid: uid});
    Database.ref('/user').on('child_added', result => {
      let data = result.val();
      if (data !== null && data.id != uid) {
        // console.log(data);
        // let users = Object.values(data);
        // console.log(users);
        this.setState(prevData => {
          return {userList: [...prevData.userList, data]};
        });
      }
    });
  };

  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location Permission Denied By User.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location Permission Revoked By User.',
        ToastAndroid.LONG,
      );
    }
    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({loading: true}, () => {
      Geolocation.getCurrentPosition(
        position => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421 * 1.5,
          };
          this.setState({
            mapRegion: region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
          });
          // console.warn(position);
        },
        error => {
          this.setState({errorMessage: error});
          // console.warn(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 10000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    });
  };

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
    Geolocation.stopObserving();
  }

  render() {
    // console.warn(this.state.userList);
    return (
      <SafeAreaView style={{flex: 1}}>
        <Header />
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <MapView
            style={{width: '100%', height: '80%'}}
            showsMyLocationButton={true}
            showsIndoorLevelPicker={true}
            showsUserLocation={true}
            zoomControlEnabled={true}
            showsCompass={true}
            showsTraffic={true}
            region={this.state.mapRegion}
            initialRegion={{
              latitude: -7.755322,
              longitude: 110.381174,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            {this.state.userList.map(item => {
              // console.warn(item);
              return (
                <Marker
                  key={item.id}
                  title={item.name}
                  description={item.status}
                  draggable
                  coordinate={{
                    latitude: item.latitude || 0,
                    longitude: item.longitude || 0,
                  }}
                  onCalloutPress={() => {
                    this.props.navigation.navigate('Chat', {
                      item,
                    });
                  }}>
                  <View>
                    <Image
                      source={{uri: item.photo}}
                      style={{width: 40, height: 40, borderRadius: 50}}
                    />
                    <Text>{item.name}</Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>
          <View style={styles.menuBottom}>
            <TouchableOpacity>
              <Text
                style={styles.buttonText}
                onPress={() => this.props.navigation.navigate('Contact')}>
                FriendList
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={styles.buttonText}
                onPress={() => this.getLocation()}>
                Current Location
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={styles.buttonText}
                onPress={() => this.props.navigation.navigate('Profile')}>
                Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
