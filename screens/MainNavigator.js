import { useState, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./Login";
import SignUp from "./Registro";
import MessagesSumary from "./MessagesSumary";
import Chat from "./Chat";
import AddFriend from "./AddFriend";

const MainNavigator = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();

    function onAuthChanged(user) {
        setUser(user);
        if (isLoading) setIsLoading(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthChanged);
        return subscriber;
    }, [])

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="SignUp" screenOptions={{headerShown: false}}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="MessagesSumary" component={MessagesSumary} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="AddFriend" component={AddFriend} />
        </Stack.Navigator>
    )
}

export default MainNavigator;
