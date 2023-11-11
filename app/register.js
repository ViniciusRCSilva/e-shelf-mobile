import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../src/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import logo from '../assets/logo.png'

export default function Register() {
    const [newUser, setNewUser] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const router = useRouter()
  
    function goToLogin() {
        router.replace('/')
    }

    function handleCreateUser() {
      if(newUser === '' || password === '' || rePassword === '') {
          alert('Os campos devem ser preenchidos!')
          return
      }
      if(password !== rePassword) {
          alert('A senha e a confirmação de senha não são iguais!')
          return
      } else {
          createUserWithEmailAndPassword(auth, newUser, password)
              .then((UserCredential) => {
                  const user = UserCredential.user
                  alert('O usuário ' + newUser + ' foi criado. Faça o login')
                  router.replace('/')
              })
              .catch((error) => {
                  const errorMessage = error.message;
                  router.replace('/')
                  alert(errorMessage);
              })
      }
    }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.text}>Sua Biblioteca Digital Pessoal</Text>
      <View style={styles.bar}></View>
      <Text style={styles.text}>Registro</Text>
      <TextInput 
          keyboardAppearance='dark'
          style={styles.input}
          placeholder='E-mail' 
          placeholderTextColor="#C4C4C4"
          value={newUser}
          onChangeText={setNewUser}
      />
      <TextInput 
          keyboardAppearance='dark'
          style={styles.input}
          placeholder='Senha' 
          placeholderTextColor="#C4C4C4"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
      />
      <TextInput 
          keyboardAppearance='dark'
          style={styles.input}
          placeholder='Repetir a senha' 
          placeholderTextColor="#C4C4C4"
          value={rePassword}
          onChangeText={setRePassword}
          secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateUser}
      >
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>

      <Text 
        style={styles.textLink}
        onPress={goToLogin}
      >
        Voltar
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
  textLink: {
    fontSize: 16,
    textDecorationLine: 'underline',
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