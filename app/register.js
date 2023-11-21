// Importando módulos e componentes necessários do React e React Native
import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { auth, db, collection, addDoc, createUserWithEmailAndPassword } from '../src/firebaseConfig';  // Importando funções e configurações do Firebase

import logo from '../assets/logo.png';  // Importando o logotipo
import { goToLogin } from '../src/routePaths';
import { global } from '../styles/style';

// Componente funcional para a tela de registro
export default function Register() {
    // Estados para os campos de entrada do usuário
    const [newUser, setNewUser] = useState('');
    const [newName, setNewName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    // Objeto com os dados do usuário
    const userData = {
        user: newUser,
        name: newName,
        books: []
    };

    // Função assíncrona para criar um novo usuário
    async function handleCreateUser() {
        // Verificando se os campos estão preenchidos
        if(newUser === '' || password === '' || rePassword === '') {
            Alert.alert('Todos os campos devem ser preenchidos!');
            return;
        }
        if(newName.length > 20) {
            Alert.alert('O nome deve conter até 20 caracteres!');
            return;
        }
        // Verificando se as senhas coincidem
        if(password !== rePassword) {
            Alert.alert('A senha e a confirmação de senha não são iguais!');
            return;
        } else {
            // Criando o usuário usando a função do Firebase
            await createUserWithEmailAndPassword(auth, newUser, password)
                .then((UserCredential) => {
                    const user = UserCredential.user;
                    // Exibindo um alerta de sucesso e adicionando o usuário ao banco de dados
                    Alert.alert(newUser + ' foi criado. Faça o login!');
                    addUser();
                    // Navegando de volta à tela de login
                    goToLogin();
                })
                .catch((error) => {
                    // Em caso de erro, exibe um alerta
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    errorMessage == 'Firebase: Error (auth/invalid-email).' && Alert.alert('Formato de email inválido! Exemplo: johndoe@gmail.com');
                    errorMessage == 'Firebase: Error (auth/email-already-in-use).' && Alert.alert('Esse email já está cadastrado!');
                    errorMessage == 'Firebase: Password should be at least 6 characters (auth/weak-password).' && Alert.alert('Sua senha deve conter no mínimo 6 caracteres!');
                });
        }
    }

    // Função assíncrona para adicionar o usuário ao banco de dados
    async function addUser() {
        try {
            const docRef = await addDoc(collection(db, "users"), userData);
        } catch(e) {
            console.log("Erro ao adicionar no documento: ", e);
        }
    }

    // JSX para a interface da tela de registro
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={global.container}>
                <Image source={logo} style={global.logo} />
                <Text style={global.text}>Sua Biblioteca Digital Pessoal</Text>
                <View style={global.bar}></View>
                <Text style={global.text}>Registro</Text>
                {/* TextInput para inserir o e-mail */}
                <TextInput
                    keyboardAppearance='dark'
                    keyboardType='email-address'
                    style={global.input}
                    placeholder='E-mail'
                    placeholderTextColor="#C4C4C4"
                    value={newUser}
                    onChangeText={setNewUser}
                />
                {/* TextInput para inserir o nome */}
                <TextInput
                    keyboardAppearance='dark'
                    style={global.input}
                    placeholder='Nome'
                    placeholderTextColor="#C4C4C4"
                    value={newName}
                    onChangeText={setNewName}
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
                {/* TextInput para confirmar a senha */}
                <TextInput
                    keyboardAppearance='dark'
                    style={global.input}
                    placeholder='Repetir a senha'
                    placeholderTextColor="#C4C4C4"
                    value={rePassword}
                    onChangeText={setRePassword}
                    secureTextEntry={true}
                />
                {/* TouchableOpacity para o botão de criação de usuário */}
                <TouchableOpacity
                    style={global.button}
                    onPress={handleCreateUser}
                >
                    <Text style={global.buttonText}>Criar</Text>
                </TouchableOpacity>

                {/* Texto para navegar de volta à tela de login */}
                <Text
                    style={global.textLink}
                    onPress={goToLogin}
                >
                    Voltar
                </Text>

                <StatusBar barStyle="dark-content" />
            </View>
        </TouchableWithoutFeedback>
    );
}