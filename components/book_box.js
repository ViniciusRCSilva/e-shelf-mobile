// Importando módulos e componentes necessários do React Native
import { Image, TouchableOpacity, View, Text, Alert, TextInput, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'

// Importando imagens e componentes
import edit_btn from '../assets/edit_button.png'
import delete_btn from '../assets/delete_button.png'
import book_icon from '../assets/book_icon.png'
import delete_modal_btn from '../assets/delete_button_book.png'
import edit_modal_btn from '../assets/edit_button_book.png'
import back_btn from '../assets/back_button.png'

import Modal from 'react-native-modal';
import BouncyCheckbox from 'react-native-bouncy-checkbox'

// Importando funções e módulos relacionados ao Firebase e React
import { arrayRemove, auth, collection, db, getDoc, getDocs, query, updateDoc, where } from '../src/firebaseConfig'
import { useState } from 'react'

import { goToHome } from '../src/routePaths'
import { actionBookStyle, bookBoxStyle, global, modalStyles } from '../styles/style'

// Componente funcional para exibir um livro
export default function Books(props) {
    // Estados para armazenar o nome do livro, valor do livro, visibilidade do modal e modo de edição
    const [bookName, setBookName] = useState(props.nome)
    const [bookValue, setBookValue] = useState(props.valor)
    const [hasOwn, setHasOwn] = useState(props.comprei)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isEditingMode, setEditingMode] = useState(false);

    // Obtendo o usuário atualmente autenticado e o roteador
    const currentUser = auth.currentUser

    // Função para alternar a visibilidade do modal
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    // Função para exibir detalhes do livro no modal
    const showBookDetails = () => {
      setEditingMode(false); // Definindo o modo de edição como falso
      toggleModal();
    };
  
    // Função para configurar o modal para o modo de edição ao clicar no botão de edição pequeno
    const miniBtnEditBook = () => {
      setEditingMode(true); // Definindo o modo de edição como verdadeiro
      toggleModal();
    };

    // Função para configurar o modal para o modo de edição ao clicar no botão de edição
    const btnEditBook = () => {
      setEditingMode(true); // Definindo o modo de edição como verdadeiro
    };

    const handleHasOwn = () => {
      setHasOwn(!props.comprei);
    }

    const deleteBook = async () => {
      try {
        if (currentUser !== null) {
          const q = query(collection(db, 'users'), where('user', '==', currentUser.email));
    
          // Obtendo os documentos que correspondem à consulta
          const querySnapshot = await getDocs(q);
    
          if (!querySnapshot.empty) {
            // Obtendo a referência do primeiro documento encontrado
            const userDocRef = querySnapshot.docs[0].ref;
    
            // Obtendo a lista de livros do documento
            const userDoc = await getDoc(userDocRef);
            const books = userDoc.data().books || [];

            // Encontrando o livro pelo nome
            const bookToDelete = books.find((book) => book.bookName === props.nome);

            // Atualizando o documento removendo o livro
            await updateDoc(userDocRef, { books: arrayRemove(bookToDelete) });

            Alert.alert('Livro removido com sucesso!');
            goToHome();
          } else {
            console.log('Nenhum documento do usuário encontrado.');
          }
        } else {
          alert('É necessário estar logado para utilizar esse recurso!');
        }
      } catch (error) {
        console.log('Erro ao excluir o livro: ', error);
        Alert.alert('Ocorreu um erro ao excluir o livro!');
      }
    }

    // Função para lidar com a exclusão do livro
    const handleDeleteBook = () => {
      Alert.alert(
        'Excluir '+ props.nome,
        'Tem certeza de que deseja excluir este livro?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Excluir',
            onPress: deleteBook
          },
        ],
        { cancelable: false }
      );
    };

    // Função assíncrona para lidar com a atualização do livro
    const handleUpdateBook = async () => {
      try {
        if (currentUser !== null) {
          const q = query(collection(db, 'users'), where('user', '==', currentUser.email));
    
          // Obtendo os documentos que correspondem à consulta
          const querySnapshot = await getDocs(q);
    
          if (!querySnapshot.empty) {
            // Obtendo a referência do primeiro documento encontrado
            const userDocRef = querySnapshot.docs[0].ref;
    
            // Obtendo a lista de livros do documento
            const userDoc = await getDoc(userDocRef);
            const books = userDoc.data().books || [];
    
            // Encontrando o livro pelo nome
            const bookToUpdateIndex = books.findIndex((book) => book.bookName === props.nome);
    
            if (bookToUpdateIndex !== -1) {
              // Criando um novo objeto com as informações atualizadas
              const updatedBook = {
                bookName: bookName || props.nome, // Usando o novo nome se fornecido, senão mantendo o antigo
                bookValue: bookValue || props.valor, // Usando o novo valor se fornecido, senão mantendo o antigo
                hasOwn: hasOwn // Usando a nova opção se fornecida
              };
    
              // Substituindo o livro antigo pelo livro atualizado
              books[bookToUpdateIndex] = updatedBook;
    
              // Atualizando o documento com a nova lista de livros
              await updateDoc(userDocRef, { books });
    
              Alert.alert('Livro editado com sucesso!');
              goToHome();
            } else {
              console.log('Livro não encontrado na lista.');
            }
          } else {
            console.log('Nenhum documento do usuário encontrado.');
          }
        } else {
          alert('É necessário estar logado para utilizar esse recurso!');
        }
      } catch (error) {
        console.log('Erro ao editar o livro: ', error);
        Alert.alert('Ocorreu um erro ao editar o livro!');
      }
    };

    // Função para limitar o comprimento da frase
    const limitPhrase = (phrase, limit) => {
      if (phrase.length <= limit) {
        return phrase;
      } else {
        return `${phrase.substring(0, limit)}...`;
      }
    };

    // JSX para renderizar o componente do livro
    return (
      <View>
        <TouchableOpacity
          style={bookBoxStyle.button}
          onPress={showBookDetails}
        >
            {/* Área de informações do livro */}
            <View style={bookBoxStyle.info}>
              <Image source={book_icon} style={bookBoxStyle.icon} />
                
              <View>
                <Text style={bookBoxStyle.title}>{limitPhrase(props.nome, 15)}</Text>
                {hasOwn == false ? (
                  <Text style={bookBoxStyle.text}>R$ {props.valor}</Text>
                ) : (
                  <Text style={bookBoxStyle.text}>Comprado!</Text>
                )}
              </View>
            </View>

            {/* Área dos botões de ação */}
            <View style={bookBoxStyle.actionButtonsArea}>
                <TouchableOpacity
                  onPress={miniBtnEditBook}
                >
                  <Image source={edit_btn} style={bookBoxStyle.bookButton} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleDeleteBook}>
                  <Image source={delete_btn} style={bookBoxStyle.bookButton} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>

        {/* Modal para exibir detalhes ou editar o livro */}
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          {/* Verificando se estamos no modo de edição ou visualização */}
          {isEditingMode ? (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              {/* Modal para edição do livro */}
              <View style={modalStyles.container}>
                <View style={global.ReturnButtonArea}>
                    <TouchableOpacity
                        onPress={toggleModal}
                    >
                        <Image source={back_btn} style={global.ReturnButton} />
                    </TouchableOpacity>
                </View>

                <View style={modalStyles.inputBookArea}>            
                    <Text style={global.title}>Editar Livro</Text>
                    <TextInput 
                        keyboardAppearance='dark'
                        style={global.input}
                        value={bookName}
                        onChangeText={setBookName}
                        placeholder='Nome' 
                        placeholderTextColor="#C4C4C4"
                    />
                    <TextInput 
                        keyboardAppearance='dark'
                        keyboardType='numeric'
                        style={global.input}
                        value={bookValue}
                        onChangeText={setBookValue}
                        placeholder='Valor' 
                        placeholderTextColor="#C4C4C4"
                    />

                    <BouncyCheckbox
                      size={25}
                      fillColor="#C1AA8B"
                      text="Marcar como comprado"
                      iconStyle={{ borderColor: "#C1AA8B" }}
                      innerIconStyle={{ borderWidth: 2 }}
                      isChecked={hasOwn}
                      textStyle={{
                        textDecorationLine: "none",
                      }}
                      onPress={handleHasOwn}
                    />
                </View>

                {/* Botões para confirmar ou cancelar a edição */}
                <View style={actionBookStyle.buttonsArea}>
                    <TouchableOpacity
                        onPress={handleUpdateBook}
                        style={global.buttonActionBook}
                    >
                        <Text style={global.buttonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={toggleModal}
                        style={global.cancelButton}
                    >
                        <Text style={global.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ) : (
          // Modal para visualização dos detalhes do livro
          <View style={modalStyles.container}>
            <View style={global.ReturnButtonArea}>
              <TouchableOpacity onPress={toggleModal}>
                <Image source={back_btn} style={global.ReturnButton} />
              </TouchableOpacity>
            </View>

            {/* Área de informações do livro */}
            <View style={modalStyles.bookInfoArea}>
              <Image source={book_icon} style={modalStyles.icon} />

              <Text style={global.title}>{props.nome}</Text>
              {hasOwn == false ? (
                <Text style={global.text}>R$ {props.valor}</Text>
                ) : (
                <Text style={global.text}>Comprado!</Text>
              )}
            </View>

            {/* Botões de ação para edição e exclusão */}
            <View style={modalStyles.bookButtonsArea}>
                <TouchableOpacity onPress={btnEditBook}>
                  <Image source={edit_modal_btn} style={modalStyles.bookButton} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleDeleteBook}>
                  <Image source={delete_modal_btn} style={modalStyles.bookButton} />
                </TouchableOpacity>
            </View>
          </View>
          )}
        </Modal>

        <StatusBar barStyle="dark-content" />
      </View>
    );
}