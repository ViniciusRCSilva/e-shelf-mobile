// Importando módulos e componentes necessários do React e React Native
import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, StatusBar, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../src/firebaseConfig';  // Importando funções de autenticação
import logo from '../assets/logo.png';  // Importando a imagem do logotipo
import { goToHome, goToRegister } from '../src/routePaths';
import { global } from '../styles/style';

// Componente funcional para a tela de login
export default function Login() {
  // Variáveis de estado para a entrada do usuário (e-mail e senha)
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  // Função assíncrona para lidar com o processo de login
  async function handleLogin() {
    // Chamando a função signInWithEmailAndPassword do firebaseConfig importado
    await signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        // Se o login for bem-sucedido, substituir a tela atual pela tela inicial
        const user = userCredential.user;
        goToHome();
      })
      .catch((error) => {
        // Se o login falhar, exibir um alerta com a mensagem de erro
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        errorMessage == 'Firebase: Error (auth/invalid-email).' && Alert.alert('Formato de email inválido! Exemplo: johndoe@gmail.com');
        errorMessage == 'Firebase: Error (auth/invalid-login-credentials).' && Alert.alert('Login ou Senha incorretos!');
      });
  }

  // JSX para a interface da tela de login
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={global.container}>
        <Image source={logo} style={global.logo} />
        <Text style={global.text}>Sua Biblioteca Digital Pessoal</Text>
        <View style={global.bar}></View>
        <Text style={global.text}>Login</Text>
        {/* TextInput para inserir o e-mail */}
        <TextInput
          keyboardAppearance='dark'
          style={global.input}
          placeholder='E-mail'
          placeholderTextColor="#C4C4C4"
          value={user}
          onChangeText={setUser}
        />
        {/* TextInput para inserir a senha */}
        <TextInput
          keyboardAppearance='dark'
          style={global.input}
          placeholder='Senha'
          placeholderTextColor="#C4C4C4"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        {/* TouchableOpacity para o botão de login */}
        <TouchableOpacity
          style={global.button}
          onPress={handleLogin}
        >
          <Text style={global.buttonText}>Entrar</Text>
        </TouchableOpacity>
        {/* Texto para navegar até a tela de registro */}
        <Text
          style={global.text}
        >
          Não tem uma conta?
        </Text>
        <Text
          style={global.textLink}
          onPress={goToRegister}
        >
          Clique aqui para criar
        </Text>

        <StatusBar barStyle="dark-content" />
      </View>
    </TouchableWithoutFeedback>
  );
}