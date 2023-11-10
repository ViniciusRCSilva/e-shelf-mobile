import { StyleSheet, View } from 'react-native';
import BottomBar from '../components/bottom_bar';
import Books from '../components/book_box';

export default function Home() {
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