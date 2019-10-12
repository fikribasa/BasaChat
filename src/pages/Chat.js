import React, {Component} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Header from '../layouts/Header';
import {withNavigation} from 'react-navigation';
import firebase from 'firebase';
import {
  GiftedChat,
  Actions,
  SystemMessage,
  Send,
} from 'react-native-gifted-chat';
import {Database} from '../constant/config';
import AsyncStorage from '@react-native-community/async-storage';
import {Bubble, Composer} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Chat extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('item').name,
      headerStyle: {
        backgroundColor: '#f48023',
        height: 100,
      },
      headerTitleStyle: {
        color: 'white',
      },
    };
  };
  state = {
    message: '',
    messageList: [],
    person: this.props.navigation.getParam('item'),
    userId: AsyncStorage.getItem('userid'),
    userName: AsyncStorage.getItem('user.name'),
    userAvatar: AsyncStorage.getItem('user.photo'),
  };

  onSend = async () => {
    if (this.state.message.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.userId)
        .child(this.state.person.id)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.message,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.userId,
          name: this.state.userName,
          avatar: this.state.userAvatar,
        },
      };
      updates[
        'messages/' +
          this.state.userId +
          '/' +
          this.state.person.id +
          '/' +
          msgId
      ] = message;
      updates[
        'messages/' +
          this.state.person.id +
          '/' +
          this.state.userId +
          '/' +
          msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({message: ''});
    }
  };

  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem('userid');
    const userName = await AsyncStorage.getItem('user.name');
    const userAvatar = await AsyncStorage.getItem('user.photo');
    this.setState({userId, userName, userAvatar});
    firebase
      .database()
      .ref('messages')
      .child(this.state.userId)
      .child(this.state.person.id)
      .on('child_added', val => {
        this.setState(previousState => ({
          messageList: GiftedChat.append(previousState.messageList, val.val()),
        }));
      });
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#f48023',
          },
        }}
      />
    );
  }

  /// icon berganti saat input text
  // renderSend = props => {
  //   if (!props.text.trim()) {
  //     // text box empty
  //     return <Icon name="mic" color="#f48023" size={50} />;
  //   }

  //   return <Icon name="send" color="#f48023" size={50} />;
  // };

  renderSend(props) {
    return (
      <Send {...props}>
        <View
          style={{
            marginRight: 30,
            marginBottom: 25,

            width: 35,
            height: 35,
          }}>
          <Image
            source={require('../assets/icon/send.png')}
            resizeMode={'center'}
            width={'40'}
            height={'40'}
          />
        </View>
      </Send>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fae1e1'}}>
        <Header />
        <GiftedChat
          renderSend={this.renderSend}
          renderBubble={this.renderBubble}
          text={this.state.message}
          onInputTextChanged={val => {
            this.setState({message: val});
          }}
          messages={this.state.messageList}
          onSend={() => this.onSend()}
          user={{
            _id: this.state.userId,
          }}
        />
      </View>
    );
  }
}
