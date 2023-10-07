import { Image, StyleSheet, Text, View } from "react-native";

export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.profileImage}/>
            <Text style={styles.headerText}>User Name</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#2B2A2A',
        justifyContent: 'flex-start',
        alignItems:'center',
        gap: 15,
        paddingLeft: 46
    },

    headerText: {
        color: 'white'
    },

    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 8,
        backgroundColor: '#469BCB'
    }
})