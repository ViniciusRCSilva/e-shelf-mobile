// Importando módulos e componentes necessários do React Native
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// Importando componentes personalizados
import BottomBar from '../components/bottom_bar';
import SignOutBtn from '../assets/signOut_button.png'
import userIcon from '../assets/user_icon.png'

// Importando módulos e funções relacionados ao Firebase e React
import { auth, collection, db, getDocs, query, signOut, where } from '../src/firebaseConfig';
import { useRouter } from 'expo-router';

// Componente funcional para a tela do usuário
export default function User() {
    // Estados para armazenar o nome do usuário e a contagem de livros
    const [user, setUser] = useState('')
    const [booksCount, setBooksCount] = useState('Carregando...')
    const currentUser = auth.currentUser

    // Obtendo o roteador para navegação
    const route = useRouter()

    // Função para realizar o logout
    function logout() {
      signOut(auth)
        .then(() => {
          route.replace('/')
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
        <View style={styles.container}>
            {/* Exibindo o ícone do usuário */}
            <Image source={userIcon} style={styles.icon} />

            {/* Exibindo o nome do usuário */}
            <Text style={styles.title}>{user}</Text>

            {/* Exibindo o total de livros cadastrados */}
            <Text style={styles.text}>Total de Livros cadastrados:</Text>
            <Text style={styles.text}>{booksCount}</Text>

            {/* Botão para realizar o logout */}
            <TouchableOpacity 
                onPress={logout}
            >
                <Image source={SignOutBtn} style={styles.button} />
            </TouchableOpacity>

            {/* Componente da barra inferior */}
            <BottomBar />
        </View>
    );
}

// Estilos para o componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    overflow: 'visible',
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    color: '#C1AA8B',
    fontSize: 32,
    fontWeight: 'bold',
  },
  text: {
    color: '#C1AA8B',
    fontSize: 20,
  },
  button: {
    width: 100,
    resizeMode: 'contain',
  },
});