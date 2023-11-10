import { StyleSheet, View } from 'react-native';
import BottomBar from '../components/bottom_bar';
import Books from '../components/book_box';
import { auth } from '../src/firebaseConfig';
import { useRouter } from 'expo-router';

export default function Home() {
  const currentUser = auth.currentUser
  const route = useRouter()

  if(currentUser != null) {
    // Usuário logado
  } else {
    alert('É necessário estar logado para utilizar esse recurso!')
    route.replace('/')
  }

  return (
    <View style={styles.container}>
        <Books nome="Exemplo" valor="20,00" />

        <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    paddingTop: 100,
    gap: 50,
    overflow: 'visible',
  },
});