import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View, SafeAreaView} from 'react-native';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  const navigator = useNavigation();

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }
  
  GoogleSignin.configure({
    webClientId:
      '962121049730-fs9ia7r3goi2fj8gb8ur4oge37jn8ovj.apps.googleusercontent.com',
  });


  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;

  function handleLogin({}) {
    setErrorMessage(null);
    if (!username.length || !password.length)
      return setErrorMessage('Usuário e/ou senha não podem estar vazios!');

    if (!username.match(emailRegex)) return setErrorMessage('E-mail inválido!');

    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((data) =>{
          console.log('Logou');
          navigator.navigate("MessagesSumary")
        }
      )
      .catch(error => {
        setErrorMessage(error);
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={styles.color}>
      <View style={styles.container}>
        <View style={styles.titleMessage}>
          <View style={styles.circle}></View>
          <Text style={styles.textMessage}>Message</Text>
        </View>
        {errorMessage && (
          <View style={{marginBottom: 20}}>
            <Text style={{color: '#f00', textAlign: 'center'}}>
              {errorMessage}
            </Text>
          </View>
        )}
        <View style={styles.containerInputs}>
          <TextInput
            placeholder="Username"
            value={username}
            placeholderTextColor="#969696"
            style={styles.inputs}
            onChangeText={username => setUsername(username)}
          />
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry
            placeholderTextColor="#969696"
            style={styles.inputs}
            onChangeText={password => setPassword(password)}
          />
        </View>
        <View style={styles.containerButtons}>
          <Button
            title="Login"
            style={'backgroundColor: #fff'}
            onPress={handleLogin}
          />
          <Button title="Logar com Google" style={styles.googleButton} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}/>
        </View>
        <Text style={{marginTop: 20, color: '#ccc'}}>
          Ainda não possui uma conta? Cadastre-se{' '}
          <Text style={{textDecorationLine: 'underline'}}>aqui</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  color: {
    backgroundColor: '#171717',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circleContainer: {
    display: 'flex',
    gap: 5,
  },

  circle: {
    width: 90,
    height: 90,
    backgroundColor: 'transparent',
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#469bcb',
  },

  titleMessage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 40,
  },

  textMessage: {
    color: '#469bcb',
    fontSize: 24,
  },

  inputs: {
    backgroundColor: '#404040',
    borderRadius: 20,
    paddingVertical: 15,
    maxWidth: 'fit-content',
    display: 'flex',
    gap: 0.5,
    padding: 10,
    alignItems: 'center',
    color: 'white'
  },

  loginButton: {
    backgroundColor: '#469bcb',
    borderRadius: 300,
    paddingHorizontal: 500,
    width: 30,
    textAlign: 'center',
  },

  googleButton: {
    maxWidth: 'fit-content',
    padding: 100,
    backgroundColor: '#469bcb',
    borderRadius: 1010,
  },

  containerInputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  containerButtons: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  container: {
    width: '80%',
    marginBottom: 100,
  },
});
