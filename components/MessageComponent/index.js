import { StyleSheet, Text, View } from "react-native"

export default function MessageComponent(prop) {

    const sender = prop.sender;
    const timestamp = prop.timestamp;
    const currentUser = prop.currentUser;
    const content = prop.content;
    const isCurrentUser = sender === currentUser;

    return (
        <View style={[
            styles.messageContainer,
            isCurrentUser ? styles.messageSenderContainer : styles.messageDestinyContainer
        ]}>
            <Text style={styles.messageText}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    messageSenderContainer: {
        backgroundColor: '#469BCB',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        flexWrap: 'wrap',
        minWidth: 20,
        maxWidth: "75%",
        marginVertical: 10
    },

    messageDestinyContainer: {
        backgroundColor: '#404040',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        flexWrap: 'wrap',
        minWidth: 20,
        maxWidth: "75%",
        marginVertical: 10
    },

    messageText: {
        color: 'white',
        fontWeight: '500'
    }
})