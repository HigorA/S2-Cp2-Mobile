import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, FlatList } from "react-native";
import Header from "../../components/Header";
import MessageComponent from "../../components/MessageComponent";
import {useEffect, useState} from 'react'
import {firebase} from '@react-native-firebase/auth';
import { rtDatabase } from "../../firebase";

export default function Chat({ route }) {

    const { userName, uid, userUid } = route.params;
    let userId = null;
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState();

    useEffect(() => {
        userId = firebase.auth().currentUser;
        rtDatabase
            .ref(`/users/${userId.uid}`)
            .once('value')
            .then((snapshot) => {
                console.log("header" + snapshot.val())
                setUser(snapshot.val())
            }
        );

        loadMessages();
    }, [])

    function loadMessages() {
        const messagesRef = rtDatabase.ref(`/chat/${uid}_${userUid}/messages`);

        messagesRef.orderByChild('timestamp').on('value', (snapshot) => {
            const messagesData = snapshot.val();

        // messagesRef.on('value', (snapshot) => {
        //     const messagesData = snapshot.val();
    
            if (messagesData) {
                // Transforme o objeto de mensagens em uma matriz de mensagens
                const messagesArray = Object.keys(messagesData).map((messageId) => ({
                    messageId,
                    ...messagesData[messageId],
                }));
    
                messagesArray.sort((a, b) => a.timestamp - b.timestamp);
                // Agora, você tem um array de mensagens para usar no seu aplicativo
                
                console.log('------------------------------------------')
                // messagesArray.map((m) => console.log(m))
                setMessages(messagesArray)
                messages.map((m) => console.log(m))
            } else {
                // Não há mensagens no chat
                console.log('Nenhuma mensagem no chat.');
            }
        });
    }

    function sendMessage() {
        const messageData = {
            text: message,
            senderUid: userUid, // O ID do remetente, você pode ajustar conforme necessário
            timestamp: firebase.database.ServerValue.TIMESTAMP, // Adicione um carimbo de data/hora
        };
    
        rtDatabase.ref(`/chat/${uid}_${userUid}/messages`).push(messageData)
            .then(() => {
                console.log('Mensagem enviada com sucesso');
            })
            .catch((error) => {
                console.error('Erro ao enviar mensagem:', error);
            });

            rtDatabase.ref(`/chat/${userUid}_${uid}/messages`).push(messageData)
            .then(() => {
                console.log('Mensagem enviada com sucesso');
            })
            .catch((error) => {
                console.error('Erro ao enviar mensagem:', error);
            });
        
        loadMessages();
    }


    return (
        <SafeAreaView style={styles.container}>
            <Header name={userName} renderButton={true} />
            {/* <View style={styles.messageContainer}>
                {messages.map((m) => {
                    return (
                        <MessageComponent key={m.messageId} currentUser={userUid} sender={m.senderUid} content={m.text} time={m.timestamp} />
                    )
                })}
            </View> */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.messageId}
                renderItem={({ item }) => (
                    <MessageComponent
                        currentUser={userUid}
                        sender={item.senderUid}
                        content={item.text}
                        time={item.timestamp}
                    />
                )}
            />
            <TextInput 
                placeholder="Digite a mensagem" 
                onChangeText={(t) => setMessage(t)}
                style={{backgroundColor: '#404040', color: 'white'}}  
                placeholderTextColor="#969696"      
            />
            <Button title="Mandar" onPress={() => sendMessage()}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#171717',
        height: '100%'
    },

    messageContainer: {
        paddingHorizontal: 10,
        gap: 12
    }
    
})