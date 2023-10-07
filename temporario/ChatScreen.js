import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import firebase from 'firebase';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    const { chatId } = this.props.navigation.getParam('chatId', '');

    //REFERENCIA DE COLECAO DE CHAT (em específico)
    const messagesRef = firebase.firestore().collection('chats').doc(chatId).collection('messages');

    // CAPTURA MUDANÇAS EM TEMPO REAL
    messagesRef.onSnapshot((snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <View>
        <Text>Chat</Text>
        <FlatList
          data={this.state.messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.text}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default ChatScreen;
