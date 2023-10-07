import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import Friend from "../../components/Friends";

export default function MessagesSumary() {
    return (
        <View style={styles.container}>
            <Header />
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
                    <Friend />
                    <Friend />
                </View>
            </View>
            <Pressable
                onPress={() => console.log('Cliquei no botão')}
                style={styles.addFriend}
            >
                <Text style={styles.buttonIcon}>+</Text>
            </Pressable>
        </View>
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