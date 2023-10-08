import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import firebase from 'firebase';

function ChatListScreen(props) {
  const [chatList, setChatList] = useState([])

  useEffect(() => {
    const chatRef = firebase.firestore().collection('chats');

    // CAPTURA MUDANÇAS EM TEMPO REAL
    chatRef.onSnapshot((snapshot) => {
      const chatList = [];
      snapshot.forEach((doc) => {
        chatList.push({ id: doc.id, ...doc.data() });
      });
      setChatList(chatList);
    });
  }, [])

    return (
      <View>
        <Text>Lista de conversas: </Text>
        <FlatList
          data={chatList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Button
              title={`Chat #${item.id}`}
              onPress={() => props.navigation.navigate('Chat', { chatId: item.id })}
            />
          )}
        />
      </View>
    );
}

export default ChatListScreen;
