import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { firebase } from "@react-native-firebase/database";

GoogleSignin.configure({
    webClientId: '962121049730-fs9ia7r3goi2fj8gb8ur4oge37jn8ovj.apps.googleusercontent.com',
});

export const rtDatabase = firebase.database();