// Importando módulos e componentes necessários do React Native
import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';

// Importando o componente BottomBar e a imagem do botão de voltar
import BottomBar from '../components/bottom_bar';
import back_btn from '../assets/cancel_button.png';

// Importando módulos e funções relacionados ao Firebase
import { db, auth, collection, arrayUnion, updateDoc, where, getDocs, query } from '../src/firebaseConfig';

import { goToHome } from '../src/routePaths';
import { actionBookStyle, global } from '../styles/style';

// Componente funcional para adicionar um livro
export default function AddBook() {
    // Estados para armazenar o nome e valor do livro
    const [bookName, setBookName] = useState('');
    const [bookValue, setBookValue] = useState('');

    // Obtendo o usuário atualmente autenticado
    const currentUser = auth.currentUser;

    // Objeto com os dados do livro
    const bookData = {
      bookName: bookName,
      bookValue: bookValue,
      hasOwn: false,
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
            goToHome();
          } else {
            console.log('Nenhum documento do usuário encontrado.');
          }
        } else {
          // Se o usuário não estiver autenticado, exibir um alerta
          Alert.alert('É necessário estar logado para utilizar esse recurso!');
        }
      } catch (error) {
        // Em caso de erro, registrar no console
        console.log('Erro ao adicionar o livro: ', error);
        Alert.alert('Ocorreu um erro ao adicionar o livro!');
      }
    }

    // JSX para a interface da tela de adição de livro
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={actionBookStyle.container}>
            {/* Área do botão de voltar */}
            <View style={global.ReturnButtonArea}>
                <TouchableOpacity
                    onPress={goToHome}
                >
                    <Image source={back_btn} style={global.ReturnButton} />
                </TouchableOpacity>
            </View>

            {/* Área de entrada do livro */}
            <View style={actionBookStyle.inputBookArea}>            
                <Text style={global.title}>Adicionar Livro</Text>
                {/* TextInput para o nome do livro */}
                <TextInput 
                    keyboardAppearance='dark'
                    style={global.input}
                    value={bookName}
                    onChangeText={setBookName}
                    placeholder='Nome' 
                    placeholderTextColor="#C4C4C4"
                />
                {/* TextInput para o valor do livro */}
                <TextInput 
                    keyboardAppearance='dark'
                    keyboardType='numeric'
                    style={global.input}
                    value={bookValue}
                    onChangeText={setBookValue}
                    placeholder='Valor' 
                    placeholderTextColor="#C4C4C4"
                />
            </View>

            {/* Área dos botões de ação */}
            <View style={actionBookStyle.buttonsArea}>
                {/* Botão para adicionar o livro */}
                <TouchableOpacity
                    onPress={addBook}
                    style={global.buttonActionBook}
                >
                    <Text style={global.buttonText}>Adicionar</Text>
                </TouchableOpacity>

                {/* Botão para cancelar e voltar à tela inicial */}
                <TouchableOpacity
                    onPress={goToHome}
                    style={global.cancelButton}
                >
                    <Text style={global.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </View>

            {/* Incluindo o componente BottomBar no final da tela */}
            <BottomBar />

            <StatusBar barStyle="dark-content" />
        </View>
      </TouchableWithoutFeedback>
    );
}