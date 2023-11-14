// Importando módulos e componentes necessários do React Native
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native';

// Importando o componente BottomBar e a imagem do botão de voltar
import BottomBar from '../components/bottom_bar';
import back_btn from '../assets/cancel_button.png';

// Importando módulos e funções relacionados ao roteador e Firebase
import { useRouter } from 'expo-router';
import { db, auth, collection, arrayUnion, updateDoc, where, getDocs, query } from '../src/firebaseConfig';

// Componente funcional para adicionar um livro
export default function AddBook() {
    // Estados para armazenar o nome e valor do livro
    const [bookName, setBookName] = useState('');
    const [bookValue, setBookValue] = useState('');

    // Obtendo o usuário atualmente autenticado e o roteador
    const currentUser = auth.currentUser;
    const route = useRouter();

    // Função para navegar de volta à tela inicial
    function goToHome() {
      route.replace('/home');
    }

    // Objeto com os dados do livro
    const bookData = {
      bookName: bookName,
      bookValue: bookValue,
      hasOwn: false
    };

    // Função assíncrona para adicionar o livro
    async function addBook() {
      try {
        // Verificando se o usuário está autenticado
        if (currentUser !== null) {
          // Criando uma consulta para encontrar documentos com base na condição "user"
          const q = query(collection(db, 'users'), where('user', '==', currentUser.email));
    
          // Obtendo os documentos que correspondem à consulta
          const querySnapshot = await getDocs(q);
    
          // Verificando se há documentos encontrados na consulta
          if (!querySnapshot.empty) {
            // Obtendo a referência do primeiro documento encontrado
            const userDocRef = querySnapshot.docs[0].ref;

            // Atualizando o documento com os dados do livro usando arrayUnion para evitar duplicatas
            await updateDoc(userDocRef, { books: arrayUnion(bookData) });
    
            // Exibindo um alerta de sucesso e navegando de volta à tela inicial
            Alert.alert('Livro ' + bookData.bookName + ' foi adicionado com sucesso!');
            route.replace('/home');
          } else {
            console.log('Nenhum documento do usuário encontrado.');
          }
        } else {
          // Se o usuário não estiver autenticado, exibir um alerta
          alert('É necessário estar logado para utilizar esse recurso!');
        }
      } catch (error) {
        // Em caso de erro, registrar no console
        console.log('Erro ao adicionar o livro: ', error);
      }
    }

    // JSX para a interface da tela de adição de livro
    return (
        <View style={styles.container}>
            {/* Área do botão de voltar */}
            <View style={styles.back_button_area}>
                <TouchableOpacity
                    onPress={goToHome}
                >
                    <Image source={back_btn} style={styles.button} />
                </TouchableOpacity>
            </View>

            {/* Área de entrada do livro */}
            <View style={styles.book_input}>            
                <Text style={styles.title}>Adicionar Livro</Text>
                {/* TextInput para o nome do livro */}
                <TextInput 
                    keyboardAppearance='dark'
                    style={styles.input}
                    value={bookName}
                    onChangeText={setBookName}
                    placeholder='Nome' 
                    placeholderTextColor="#C4C4C4"
                />
                {/* TextInput para o valor do livro */}
                <TextInput 
                    keyboardAppearance='dark'
                    keyboardType='numeric'
                    style={styles.input}
                    value={bookValue}
                    onChangeText={setBookValue}
                    placeholder='Valor' 
                    placeholderTextColor="#C4C4C4"
                />
            </View>

            {/* Área dos botões de ação */}
            <View style={styles.buttons_area}>
                {/* Botão para adicionar o livro */}
                <TouchableOpacity
                    onPress={addBook}
                    style={styles.add_button}
                >
                    <Text style={styles.add_text}>Adicionar</Text>
                </TouchableOpacity>

                {/* Botão para cancelar e voltar à tela inicial */}
                <TouchableOpacity
                    onPress={goToHome}
                    style={styles.cancel_button}
                >
                    <Text style={styles.cancel_text}>Cancelar</Text>
                </TouchableOpacity>
            </View>

            {/* Incluindo o componente BottomBar no final da tela */}
            <BottomBar />

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
    paddingTop: 100,
    gap: 30,
  },
  back_button_area: {
    width: '80%',
    justifyContent: 'flex-start',
    paddingBottom: 80,
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
  buttons_area: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  book_input: {
    alignItems: 'center',
    gap: 20,
  },
  title: {
    color: '#C1AA8B',
    fontSize: 32,
    fontWeight: 'bold',
  },
  text: {
    color: '#C1AA8B',
    fontSize: 24,
  },
  add_button: {
    backgroundColor: '#C1AA8B',
    padding: 15,
    borderRadius: 100,
  },
  add_text: {
    color: '#fff',
  },
  cancel_button: {
    backgroundColor: '#B42929',
    padding: 15,
    borderRadius: 100,
  },
  cancel_text: {
    color: '#fff',
  },
});