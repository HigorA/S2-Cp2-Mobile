import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import {firebase} from '@react-native-firebase/auth';
import { rtDatabase } from "../../firebase";
import { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Header(prop) {

    let userId = null;
    const navigator = useNavigation();
    const [user, setUser] = useState({});
    const [renderBackButton, setRenderBackButton] = useState(prop.renderButton) 

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
    }, [])
    
    const logOut = () => {
        auth().signOut();
        navigator.navigate("SignIn");
    }
    

    return (
        <View style={styles.container}>
            {renderBackButton == true && <Text style={styles.headerText} onPress={() => navigator.goBack()}>{'<'}</Text>}
            <View style={styles.profileImage}/>
            <Text style={styles.headerText}>{user.displayName}</Text>
            <Pressable onPress={() => logOut()}><Text>Log Out</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 99,
        flexDirection: 'row',
        backgroundColor: '#2B2A2A',
        justifyContent: 'flex-start',
        alignItems:'center',
        gap: 15,
        paddingLeft: 46
    },

    headerText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },

    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 8,
        backgroundColor: '#469BCB'
    }
})