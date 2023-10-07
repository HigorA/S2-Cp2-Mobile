import { StyleSheet, Text, View } from "react-native"

export default function MessageComponent() {
    return (
        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>Message Content</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        backgroundColor: '#469BCB',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        flexWrap: 'wrap',
        minWidth: 20,
        maxWidth: "75%"
    },

    messageText: {
        color: 'white',
        fontWeight: '500'
    }
})