import { StyleSheet, Text, View } from "react-native";

export default function Friend(prop) {

    return(
        <View style={styles.container}>
            <View style={{width: 45, height: 45, backgroundColor: '#469BCB', borderRadius: 8}} />
            <Text style={styles.friendName} >{prop.userName}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        
    },

    friendName: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14
    }
}); 
