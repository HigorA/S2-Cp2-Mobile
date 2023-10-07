import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import firebase from 'firebase';

class ChatListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatList: [],
    };
  }

  componentDidMount() {
    // REFERENCIA DE COLECAO DE CHAT (SE PRECISO)
    const chatRef = firebase.firestore().collection('chats');

    // CAPTURA MUDANÇAS EM TEMPO REAL
    chatRef.onSnapshot((snapshot) => {
      const chatList = [];
      snapshot.forEach((doc) => {
        chatList.push({ id: doc.id, ...doc.data() });
      });
      this.setState({ chatList });
    });
  }

  render() {
    return (
      <View>
        <Text>Lista de conversas: </Text>
        <FlatList
          data={this.state.chatList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Button
              title={`Chat #${item.id}`}
              onPress={() => this.props.navigation.navigate('Chat', { chatId: item.id })}
            />
          )}
        />
      </View>
    );
  }
}

export default ChatListScreen;
