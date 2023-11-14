// Importando módulos e componentes necessários do React e React Native
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';  // Importando o roteador do Expo
import { auth, db, collection, addDoc, createUserWithEmailAndPassword } from '../src/firebaseConfig';  // Importando funções e configurações do Firebase

import logo from '../assets/logo.png';  // Importando o logotipo

// Componente funcional para a tela de registro
export default function Register() {
    // Estados para os campos de entrada do usuário
    const [newUser, setNewUser] = useState('');
    const [newName, setNewName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const router = useRouter();  // Acessando o roteador do Expo

    // Função para navegar até a tela de login
    function goToLogin() {
        router.replace('/');
    }

    // Função assíncrona para criar um novo usuário
    async function handleCreateUser() {
        // Verificando se os campos estão preenchidos
        if(newUser === '' || password === '' || rePassword === '') {
            alert('Os campos devem ser preenchidos!');
            return;
        }
        // Verificando se as senhas coincidem
        if(password !== rePassword) {
            alert('A senha e a confirmação de senha não são iguais!');
            return;
        } else {
            // Criando o usuário usando a função do Firebase
            await createUserWithEmailAndPassword(auth, newUser, password)
                .then((UserCredential) => {
                    const user = UserCredential.user;
                    // Exibindo um alerta de sucesso e adicionando o usuário ao banco de dados
                    Alert.alert('O usuário ' + newUser + ' foi criado. Faça o login!');
                    addUser();
                    // Navegando de volta à tela de login
                    router.replace('/');
                })
                .catch((error) => {
                    // Em caso de erro, exibindo um alerta e navegando de volta à tela de login
                    const errorMessage = error.message;
                    router.replace('/');
                    alert(errorMessage);
                });
        }
    }

    // Objeto com os dados do usuário
    const userData = {
        user: newUser,
        name: newName,
        books: [],
    };

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
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>Sua Biblioteca Digital Pessoal</Text>
            <View style={styles.bar}></View>
            <Text style={styles.text}>Registro</Text>
            {/* TextInput para inserir o e-mail */}
            <TextInput
                keyboardAppearance='dark'
                style={styles.input}
                placeholder='E-mail'
                placeholderTextColor="#C4C4C4"
                value={newUser}
                onChangeText={setNewUser}
            />
            {/* TextInput para inserir o nome */}
            <TextInput
                keyboardAppearance='dark'
                style={styles.input}
                placeholder='Nome'
                placeholderTextColor="#C4C4C4"
                value={newName}
                onChangeText={setNewName}
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
            {/* TextInput para confirmar a senha */}
            <TextInput
                keyboardAppearance='dark'
                style={styles.input}
                placeholder='Repetir a senha'
                placeholderTextColor="#C4C4C4"
                value={rePassword}
                onChangeText={setRePassword}
                secureTextEntry={true}
            />
            {/* TouchableOpacity para o botão de criação de usuário */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleCreateUser}
            >
                <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>

            {/* Texto para navegar de volta à tela de login */}
            <Text
                style={styles.textLink}
                onPress={goToLogin}
            >
                Voltar
            </Text>

            <StatusBar barStyle="dark-content" />
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
    }
});