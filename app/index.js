import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../src/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

import logo from '../assets/logo.png'

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  function goToRegister() {
    router.replace('/register')
  }

  function handleLogin(){
    signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace('/home')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      })
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.text}>Sua Biblioteca Digital Pessoal</Text>
      <View style={styles.bar}></View>
      <Text style={styles.text}>Login</Text>
      <TextInput 
          keyboardAppearance='dark'
          style={styles.input}
          placeholder='E-mail' 
          value={user}
          onChangeText={setUser}
      />
      <TextInput 
          keyboardAppearance='dark'
          style={styles.input}
          placeholder='Senha' 
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text 
        style={styles.text}
        onPress={goToRegister}
      >
        Não tenho uma conta
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    color: '#C1AA8B',
  },
  bar: {
    width: 250,
    height: 5,
    backgroundColor: '#D0BFA8',
    borderRadius: 100,
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#C1AA8B',
    padding: 10,
    paddingLeft: 8,
    paddingHorizontal: 50,
  },
  button: {
    width: 200,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C1AA8B',
    borderRadius: 100,
  },
  buttonText: {
    color: '#fff',
  }
});