// Importando módulos e componentes necessários do React Native
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import BottomBar from '../components/bottom_bar';  // Importando o componente BottomBar
import Books from '../components/book_box';  // Importando o componente Books
import { auth, collection, db, getDocs, query, where } from '../src/firebaseConfig';  // Importando funções e configurações do Firebase
import { useRouter } from 'expo-router';  // Importando o roteador do Expo
import { useEffect, useState } from 'react';  // Importando hooks do React

// Componente funcional para a tela principal (Home)
export default function Home() {
  // Estado para armazenar a lista de livros do usuário
  const [books, setBooks] = useState([]);
  const currentUser = auth.currentUser;  // Obtendo o usuário atualmente autenticado
  const route = useRouter();

  // Verificando se há um usuário autenticado
  if(currentUser != null) {
    // Usuário logado
  } else {
    // Se não houver usuário autenticado, exibir um alerta e redirecionar para a tela de login
    alert('É necessário estar logado para utilizar esse recurso!');
    route.replace('/');
  }

  // Função assíncrona para obter os livros associados ao usuário atual
  async function getBooksForCurrentUser() {
    try {
      if (currentUser !== null) {
        // Criando uma consulta para encontrar documentos com base na condição "user"
        const q = query(collection(db, 'users'), where('user', '==', currentUser.email));

        // Obtendo os documentos que correspondem à consulta
        const querySnapshot = await getDocs(q);

        // Verificando se há documentos encontrados na consulta
        if (!querySnapshot.empty) {
          // Obtendo o primeiro documento encontrado e retornando a lista de livros associados ao usuário
          const booksArray = querySnapshot.docs[0].data().books || [];
          return booksArray;
        } else {
          // Se nenhum documento do usuário for encontrado, retornar uma lista vazia
          return [];
        }
      } else {
        // Se o usuário não estiver autenticado, retornar uma lista vazia
        return [];
      }
    } catch (error) {
      // Em caso de erro, registrar no console e tratar conforme necessário
      console.error('Erro ao obter os livros do usuário:', error);
      throw error;
    }
  }

  // Hook useEffect para carregar os livros do usuário quando o componente é montado
  useEffect(() => {
    // Função interna assíncrona para buscar os livros do usuário
    async function fetchBooks() {
      try {
        const userBooks = await getBooksForCurrentUser();
        setBooks(userBooks);
      } catch (error) {
        // Em caso de erro, registrar no console
        console.error('Erro ao obter a lista de livros do usuário:', error);
      }
    }

    // Chamando a função interna
    fetchBooks();
  }, []);  // O array de dependências vazio indica que o efeito ocorre apenas uma vez, equivalente ao componentDidMount

  // JSX para a interface da tela principal
  return (
    <View style={styles.container}>
      {/* Verificando se o usuário possui livros cadastrados */}
      {books.length > 0 ? (
        // Se houver livros, mapear e exibir cada um usando o componente Books
        books.map((book, index) => (
          <View key={index}>
            <Books nome={book.bookName} valor={book.bookValue} comprei={book.hasOwn} />
          </View>
        ))
      ) : (
        // Se o usuário não tiver livros cadastrados, exibir uma mensagem
        <Text style={styles.text}>Você não tem livros cadastrados.</Text>
      )}
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
    paddingTop: 50,
    gap: 50,
    overflow: 'visible',
  },
  text: {
    color: '#C1AA8B',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});