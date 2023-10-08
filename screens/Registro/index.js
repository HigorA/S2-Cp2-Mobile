import {firebase} from '@react-native-firebase/auth';
import {useState} from 'react';
import {Button, StyleSheet, TextInput, Text, View, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { rtDatabase } from '../../firebase';

export default function SignUp({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
  
  const navigator = useNavigation();

  function handleUserCreation() {
    setErrorMessage(null);
    if (!email.length || !password.length || !confirmPassword.length)
      return setErrorMessage('Preencha todos os campos!');
    if (password.length < 6)
      return setErrorMessage('A senha deve ter no mínimo 6 caracteres');
    if (password !== confirmPassword)
      return setErrorMessage('As senhas não coincidem!');
    if (!email.trim().match(emailRegex))
      return setErrorMessage('E-mail inválido!');

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data)
        const user = firebase.auth().currentUser;
        if (user) {
          console.log(user)
          rtDatabase.ref(`/users/${user.uid}`).set({displayName: username, email: user.email})
        }
      })
      .catch(error => {
        setErrorMessage(error);
        console.log(error);
      }
    );

    

    navigator.navigate("MessagesSumary")
  }

  return (
    <SafeAreaView style={styles.color}>
      <View style={styles.container}>
        <View style={styles.titleMessage}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}></View>
            <Text style={styles.textMessage}>Message</Text>
          </View>
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
            placeholderTextColor="#969696"
            style={styles.inputs}
            value={username}
            onChangeText={username => setUsername(username)}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#969696"
            style={styles.inputs}
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#969696"
            style={styles.inputs}
            value={password}
            secureTextEntry
            onChangeText={password => setPassword(password)}
          />
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor="#969696"
            style={styles.inputs}
            secureTextEntry
            value={confirmPassword}
            onChangeText={confirmPassword =>
              setConfirmPassword(confirmPassword)
            }
          />
        </View>
        <View style={styles.containerButtons}>
          <Button
            title="Register"
            onPress={() => handleUserCreation()}
            style={styles.registerButton}
          />
        </View>
        <Text style={{marginTop: 20, color: '#ccc'}}>
          Já possui uma conta? Faça o login{' '}
          <Text style={{textDecorationLine: 'underline'}} onPress={() => navigator.navigate("SignIn")}>clicando aqui</Text>
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
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
    borderRadius: 10,
    maxWidth: 'fit-content',
    display: 'flex',
    gap: 0.5,
    padding: 10,
    alignItems: 'center',
    color:'white'
  },

  registerButton: {
    backgroundColor: '#18d',
    borderRadius: 15,
    textAlign: 'center',
  },

  googleButton: {
    maxWidth: 'fit-content',
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 10,
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
