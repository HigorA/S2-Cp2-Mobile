import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import MessageComponent from "../../components/MessageComponent";

export default function Message() {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.messageContainer}>
                <Text style={{color: 'white'}}>Message Screen</Text>
                <MessageComponent />
            </View>
        </View>
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