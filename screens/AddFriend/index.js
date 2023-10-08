import { Image, StyleSheet, Text, View, Pressable, SafeAreaView, TextInput } from "react-native";
import Header from "../../components/Header";
import { rtDatabase } from "../../firebase";
import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function AddFriend() {
    
    const [userId, setUserId] = useState(null); 
    const navigator = useNavigation();
    const [email, setEmail] = useState('');
    const [data, setData] = useState({});
    const referenceUsers = rtDatabase.ref("/users")
    let friendKey = null;
    
    useEffect(() => {
        const currentUser = auth().currentUser;
        if (currentUser) {
            setUserId(currentUser.uid);
            console.log("teste: " + currentUser.uid);
        }
    }, [])

    function SearchFriend(emailFriend) {
        referenceUsers.once('value').then((snapshot) => {
            setData(snapshot.val())
            const searchedFriend= filterData(emailFriend);
            friendKey = Object.keys(searchedFriend)[0];
            console.log(friendKey)

            if (friendKey) {
                AddFriend(friendKey, userId)
                navigator.goBack()
            }
        })  
    }

    function AddFriend(friendId, id) {
        console.log("friend: " + friendId)
        console.log("Id: " + id)
        rtDatabase.ref(`/users/${id}/friends`).once('value').then((snapshot) => {
            let currentFriends = snapshot.val();
            if (currentFriends == null) {
                currentFriends = [];
            }
            currentFriends.push(friendId);

            rtDatabase.ref(`/users/${id}`).update({friends: currentFriends}).then(() => {
                console.log("amigo adicionado")
            }).catch((error) => {
                console.log("erro ao adicionar amigo: " + error)
            })
        })

        rtDatabase.ref(`/users/${friendId}/friends`).once('value').then((snapshot) => {
            let currentFriends = snapshot.val();
            if (currentFriends == null) {
                currentFriends = [];
            }
            currentFriends.push(id);

            rtDatabase.ref(`/users/${friendId}`).update({friends: currentFriends}).then(() => {
                console.log("amigo adicionado")
            }).catch((error) => {
                console.log("erro ao adicionar amigo 2: " + error)
            })
        })

        const chatReference = rtDatabase.ref("/chat").push();
        chatReference.set({
            userUid1: id,
            userUid2: friendId,
        }).then(() => console.log("Chat criado"))
        .catch((error) => console.log(`Erro ao criar o chat ${error}`))
    }

    function filterData(targetEmail) {
        if (!data) {
            return {}; // Retorna um objeto vazio se data for nulo ou indefinido
        }

        // Defina o email que você deseja filtrar
        const targetData = targetEmail;

        // Use Object.keys() para obter as chaves do objeto e, em seguida, filtre os dados com base no email
        const filtered = Object.keys(data).reduce((result, userId) => {
            if (data[userId].email === targetData) {
                result[userId] = data[userId];
            }
            return result;
        }, {});

        return filtered;
    }
    

    return(
        <SafeAreaView style={styles.container}>
            <Header renderButton={true}/>
            <View style={styles.inputContainer}>
                <Text style={[styles.texto, {alignSelf: 'flex-start'}]}>E-mail do amigo a ser adicionado</Text>
                <TextInput placeholder="e-mail" placeholderTextColor="#969696" style={styles.input} onChangeText={(email) => setEmail(email)}/>
            </View>
            <Pressable 
                style={styles.addButton}
                onPress={() => SearchFriend(email)}>
                <Text style={styles.texto}>Adicionar</Text>
            </Pressable>
        </SafeAreaView>
    ) 
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#171717',
        height: '100%',
        width: '100%',
        
    },

    inputContainer: {
        marginTop: 142,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 16,
        width: '90%'
    },

    texto: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },

    input: {
        backgroundColor: '#404040',
        color: "white",
        width: "100%",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8
    },
    
    addButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#469BCB',
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 180
    }
    
})
