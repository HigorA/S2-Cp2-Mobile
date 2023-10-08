import { FlatList, Pressable, StyleSheet, Text, View, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import Friend from "../../components/Friends";
import {firebase} from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { rtDatabase } from "../../firebase";

export default function MessagesSumary() {

    const user = firebase.auth().currentUser;
    const navigator = useNavigation();
    const [friends, setFriends] = useState([]);
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        // Carregue a lista de amigos do usuário
        rtDatabase.ref(`/users/${user.uid}/friends`).once('value')
        .then((snapshot) => {
            const friendIds = snapshot.val();

            if (friendIds) {
                // Converta os IDs dos amigos em um array
                const friendIdsArray = Object.values(friendIds);

                // Para cada amigo, obtenha suas informações e adicione à lista de amigos
                Promise.all(
                    friendIdsArray.map((friendId) =>
                        rtDatabase.ref(`/users/${friendId}`).once('value')
                    )
                )
                .then((friendSnapshots) => {
                    const friendsData = friendSnapshots.map((snapshot) => {
                        const friendData = snapshot.val();
                        return {
                            uid: snapshot.key,
                            displayName: friendData.displayName,
                            email: friendData.email,
                        };
                    });

                    setFriendList(friendsData);
                })
                .catch((error) => {
                    console.error('Erro ao buscar informações dos amigos:', error);
                });
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar lista de amigos:', error);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header renderButton={false} />
            <View style={styles.messageContainer}>    
                <Text style={{color: 'white', fontWeight: '700', fontSize: 16}}>Messages</Text>
                {/* <FlatList
                    data={this.state.chatList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Button
                        title={`Chat #${item.id}`}
                        onPress={() => this.props.navigation.navigate('Chat', { chatId: item.id })}
                        />
                        )}
                    /> */}
                <View style={{gap: 12, paddingTop: 42}}>
                    {friendList.map((f) => {
                        return (
                            <Friend key={f["uid"]} userName={f["displayName"]}/>
                        )
                    })}
                </View>
            </View>
            <Pressable
                onPress={() => navigator.navigate("AddFriend")}
                style={styles.addFriend}
            >
                <Text style={styles.buttonIcon}>+</Text>
            </Pressable>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#171717',
        height: '100%'
    },

    messageContainer: {
        paddingHorizontal: 42,
        paddingTop: 52
    },

    addFriend: {
        position: 'absolute',
        height: 64,
        width: 64,
        backgroundColor: '#469BCB',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 24,
        right: 24
    },

    buttonIcon: {
        fontWeight: '400',
        color: 'white',
        fontSize: 36
    }
    
})