// Importando módulos e componentes necessários do React e React Native
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';  // Biblioteca de roteamento para o Expo
import { auth, signInWithEmailAndPassword } from '../src/firebaseConfig';  // Importando funções de autenticação
import logo from '../assets/logo.png';  // Importando a imagem do logotipo

// Componente funcional para a tela de login
export default function Login() {
  // Variáveis de estado para a entrada do usuário (e-mail e senha)
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  // Acessando o roteador de 'expo-router'
  const route = useRouter();

  // Função para navegar até a tela de registro
  function goToRegister() {
    route.replace('/register');  // Utilizando o roteador para substituir a tela atual pela tela de registro
  }

  // Função assíncrona para lidar com o processo de login
  async function handleLogin() {
    // Chamando a função signInWithEmailAndPassword do firebaseConfig importado
    await signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        // Se o login for bem-sucedido, substituir a tela atual pela tela inicial
        const user = userCredential.user;
        route.replace('/home');
      })
      .catch((error) => {
        // Se o login falhar, exibir um alerta com a mensagem de erro
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  // JSX para a interface da tela de login
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.text}>Sua Biblioteca Digital Pessoal</Text>
      <View style={styles.bar}></View>
      <Text style={styles.text}>Login</Text>
      {/* TextInput para inserir o e-mail */}
      <TextInput
        keyboardAppearance='dark'
        style={styles.input}
        placeholder='E-mail'
        placeholderTextColor="#C4C4C4"
        value={user}
        onChangeText={setUser}
      />
      {/* TextInput para inserir a senha */}
      <TextInput
        keyboardAppearance='dark'
        style={styles.input}
        placeholder='Senha'
        placeholderTextColor="#C4C4C4"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {/* TouchableOpacity para o botão de login */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      {/* Texto para navegar até a tela de registro */}
      <Text
        style={styles.text}
        onPress={goToRegister}
      >
        Não tem uma conta?
      </Text>
      {/* Texto para navegar até a tela de registro (alternativa) */}
      <Text
        style={styles.textLink}
        onPress={goToRegister}
      >
        Clique aqui para criar
      </Text>
    </View>
  );
}

// Estilos para os componentes usando StyleSheet.create
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
  },
});