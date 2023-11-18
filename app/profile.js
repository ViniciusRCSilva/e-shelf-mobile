// Importando módulos e componentes necessários do React Native
import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';

// Importando componentes personalizados
import BottomBar from '../components/bottom_bar';
import SignOutBtn from '../assets/signOut_button.png'
import userIcon from '../assets/user_icon.png'

// Importando módulos e funções relacionados ao Firebase
import { auth, collection, db, getDocs, query, signOut, where } from '../src/firebaseConfig';
import { goToLogin } from '../src/routePaths';
import { global, profileStyle } from '../styles/style';

// Componente funcional para a tela do usuário
export default function User() {
    // Estados para armazenar o nome do usuário e a contagem de livros
    const [user, setUser] = useState('')
    const [booksCount, setBooksCount] = useState('Carregando...')
    const currentUser = auth.currentUser

    // Função para realizar o logout
    function logout() {
      signOut(auth)
        .then(() => {
          goToLogin();
        })
        .catch((error) => {
          const errorMessage = error.errorMessage
        })
    }

    // Função assíncrona para obter o nome do usuário com base no e-mail
    async function getUserNameByEmail() {
      try {
        const q = query(collection(db, 'users'), where('user', '==', currentUser.email));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const userName = querySnapshot.docs[0].data().name || '';
          return userName;
        } else {
          return '';
        }
      } catch (error) {
        console.error('Erro ao obter o nome do usuário:', error);
        throw error;
      }
    }

    // Efeito colateral para obter o nome do usuário ao carregar o componente
    useEffect(() => {
      async function fetchUser() {
        try {
          const userName = await getUserNameByEmail();
          setUser(userName);
        } catch (error) {
          console.error('Erro ao obter o nome do usuário:', error);
        }
      }
  
      fetchUser();
    }, [])

    // Função assíncrona para obter a contagem de livros do usuário
    async function getBooksCountForCurrentUser() {
      try {
        if (currentUser !== null) {
          const q = query(collection(db, 'users'), where('user', '==', currentUser.email));
          const querySnapshot = await getDocs(q);
    
          if (!querySnapshot.empty) {
            const booksArray = querySnapshot.docs[0].data().books || [];
            return booksArray.length;
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      } catch (error) {
        console.error('Erro ao obter a contagem de livros do usuário:', error);
        throw error;
      }
    }

    // Efeito colateral para obter a contagem de livros ao carregar o componente
    useEffect(() => {
      async function fetchBooksCount() {
        try {
          const count = await getBooksCountForCurrentUser();
          setBooksCount(count);
        } catch (error) {
          console.error('Erro ao obter a contagem de livros do usuário:', error);
        }
      }
  
      fetchBooksCount(); // Chame a função aqui
    }, [])

    // JSX para renderizar o componente da tela do usuário
    return (
        <View style={profileStyle.container}>
            {/* Exibindo o ícone do usuário */}
            <Image source={userIcon} style={profileStyle.icon} />

            {/* Exibindo o nome do usuário */}
            <Text style={global.title}>{user}</Text>

            {/* Exibindo o total de livros cadastrados */}
            <Text style={global.text}>Total de Livros cadastrados:</Text>
            <Text style={global.text}>{booksCount}</Text>

            {/* Botão para realizar o logout */}
            <TouchableOpacity 
                onPress={logout}
            >
                <Image source={SignOutBtn} style={profileStyle.signOutButton} />
            </TouchableOpacity>

            {/* Componente da barra inferior */}
            <BottomBar />

            <StatusBar barStyle="dark-content" />
        </View>
    );
}