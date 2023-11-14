// Importando módulos e componentes necessários do React Native
import { StyleSheet, Image, TouchableOpacity, View, Text, Alert, TextInput, StatusBar } from 'react-native'

// Importando imagens e componentes
import edit_btn from '../assets/edit_button.png'
import delete_btn from '../assets/delete_button.png'
import book_icon from '../assets/book_icon.png'
import delete_modal_btn from '../assets/delete_button_book.png'
import edit_modal_btn from '../assets/edit_button_book.png'
import back_btn from '../assets/back_button.png'
import { useRouter } from 'expo-router'
import Modal from 'react-native-modal';
import BouncyCheckbox from 'react-native-bouncy-checkbox'

// Importando funções e módulos relacionados ao Firebase e React
import { arrayRemove, auth, collection, db, getDoc, getDocs, query, updateDoc, where } from '../src/firebaseConfig'
import { useState } from 'react'

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
    const route = useRouter()

    // Função para alternar a visibilidade do modal
    function toggleModal() {
      setModalVisible(!isModalVisible);
    };

    // Função para exibir detalhes do livro no modal
    function showBookDetails() {
      setEditingMode(false); // Definindo o modo de edição como falso
      toggleModal();
    };
  
    // Função para configurar o modal para o modo de edição ao clicar no botão de edição pequeno
    function miniBtnEditBook() {
      setEditingMode(true); // Definindo o modo de edição como verdadeiro
      toggleModal();
    };

    // Função para configurar o modal para o modo de edição ao clicar no botão de edição
    function btnEditBook() {
      setEditingMode(true); // Definindo o modo de edição como verdadeiro
    };

    function handleHasOwn() {
      setHasOwn(!props.comprei);
    }

    // Função para lidar com a exclusão do livro
    function handleDeleteBook() {
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
            onPress: async function deleteBook() {
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
                    route.replace('/home')
                  } else {
                    console.log('Nenhum documento do usuário encontrado.');
                  }
                } else {
                  alert('É necessário estar logado para utilizar esse recurso!');
                }
              } catch (error) {
                console.log('Erro ao excluir o livro: ', error);
              }
            }
          },
        ],
        { cancelable: false }
      );
    };

    // Função assíncrona para lidar com a atualização do livro
    async function handleUpdateBook() {
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
              route.replace('/home');
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
          style={styles.button}
          onPress={showBookDetails}
        >
            {/* Área de informações do livro */}
            <View style={styles.info}>
              <Image source={book_icon} style={styles.icon} />
                
              <View>
                <Text style={styles.title}>{limitPhrase(props.nome, 15)}</Text>
                {hasOwn == false ? (
                  <Text style={styles.text}>R$ {props.valor}</Text>
                ) : (
                  <Text style={styles.text}>Comprado!</Text>
                )}
              </View>
            </View>

            {/* Área dos botões de ação */}
            <View style={styles.action_buttons} >
                <TouchableOpacity
                  onPress={miniBtnEditBook}
                >
                  <Image source={edit_btn} style={styles.book_button} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleDeleteBook}>
                  <Image source={delete_btn} style={styles.book_button} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>

        {/* Modal para exibir detalhes ou editar o livro */}
        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          {/* Verificando se estamos no modo de edição ou visualização */}
          {isEditingMode ? (
            // Modal para edição do livro
            <View style={editStyle.container}>
              <View style={editStyle.back_button_area}>
                  <TouchableOpacity
                      onPress={toggleModal}
                  >
                      <Image source={back_btn} style={editStyle.button} />
                  </TouchableOpacity>
              </View>

              <View style={editStyle.book_input}>            
                  <Text style={editStyle.title}>Editar Livro</Text>
                  <TextInput 
                      keyboardAppearance='dark'
                      style={editStyle.input}
                      value={bookName}
                      onChangeText={setBookName}
                      placeholder='Nome' 
                      placeholderTextColor="#C4C4C4"
                  />
                  <TextInput 
                      keyboardAppearance='dark'
                      keyboardType='numeric'
                      style={editStyle.input}
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
              <View style={editStyle.buttons_area}>
                  <TouchableOpacity
                      onPress={handleUpdateBook}
                      style={editStyle.add_button}
                  >
                      <Text style={editStyle.add_text}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                      onPress={toggleModal}
                      style={editStyle.cancel_button}
                  >
                      <Text style={editStyle.cancel_text}>Cancelar</Text>
                  </TouchableOpacity>
              </View>
            </View>
          ) : (
          // Modal para visualização dos detalhes do livro
          <View style={modalStyles.container}>
            <View style={modalStyles.back_button_area}>
              <TouchableOpacity onPress={toggleModal}>
                <Image source={back_btn} style={modalStyles.button} />
              </TouchableOpacity>
            </View>

            {/* Área de informações do livro */}
            <View style={modalStyles.book_info}>
              <Image source={book_icon} style={modalStyles.icon} />

              <Text style={modalStyles.title}>{props.nome}</Text>
              {hasOwn == false ? (
                <Text style={modalStyles.text}>R$ {props.valor}</Text>
                ) : (
                <Text style={modalStyles.text}>Comprado!</Text>
              )}
            </View>

            {/* Botões de ação para edição e exclusão */}
            <View style={modalStyles.book_buttons}>
                <TouchableOpacity onPress={btnEditBook}>
                  <Image source={edit_modal_btn} style={modalStyles.button_book} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleDeleteBook}>
                  <Image source={delete_modal_btn} style={modalStyles.button_book} />
                </TouchableOpacity>
            </View>
          </View>
          )}
        </Modal>

        <StatusBar barStyle="dark-content" />
      </View>
    );
}

// Estilos para os componentes
const styles = StyleSheet.create({
  button: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  info: {
    width: '40%',
    flexDirection: 'row',
    alignContent: 'center',
    gap: 10,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    color: '#C1AA8B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: '#C1AA8B',
  },
  action_buttons: {
    width: '40%',
    justifyContent: 'flex-end',
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  book_button: {
    width: 40,
    height: 40,
  }
});

const modalStyles = {
  container: {
    flex: 1,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    paddingTop: 100,
    borderRadius: 10,
  },
  back_button_area: {
    width: '80%',
    justifyContent: 'flex-start',
    paddingBottom: 120,
  },
  button: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  book_info: {
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    color: '#C1AA8B',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#C1AA8B',
    fontSize: 24,
  },
  book_buttons: {
    flexDirection: 'row',
    gap: 20,
  },
  button_book: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
};

const editStyle = {
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
}