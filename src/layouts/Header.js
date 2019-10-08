import React from 'react';
import {TouchableOpacity, StatusBar, Text, Image, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: '',
    };
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          paddingTop: 40,
          backgroundColor: '#f48023',

          paddingBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.openDrawer()}
          style={{paddingHorizontal: 30}}>
          <Image
            source={require('../assets/icon/menu-24px.png')}
            width={30}
            height={40}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
            BasaChat
          </Text>
        </View>

        <StatusBar translucent backgroundColor="transparent" />
      </SafeAreaView>
    );
  }
}

export default withNavigation(Header);
