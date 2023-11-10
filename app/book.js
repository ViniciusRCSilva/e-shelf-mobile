import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import BottomBar from '../components/bottom_bar';
import back_btn from '../assets/back_button.png'
import book_icon from '../assets/book_icon.png'
import edit_btn from '../assets/edit_button_book.png'
import delete_btn from '../assets/delete_button_book.png'
import { useRouter } from 'expo-router';

export default function Book() {
    const route = useRouter()

    function goToHome(){
        route.replace('/home')
    }

    function goToEditBook(){
        route.replace('/editBook')
    }

    return (
        <View style={styles.container}>
            <View style={styles.back_button_area}>
                <TouchableOpacity
                    onPress={goToHome}
                >
                    <Image source={back_btn} style={styles.button} />
                </TouchableOpacity>
            </View>

            <View style={styles.book_info}>            
                <Image source={book_icon} style={styles.icon} />

                <Text style={styles.title}>Nome</Text>
                <Text style={styles.text}>R$ Valor</Text>
            </View>

            <View style={styles.book_buttons}>   
                <TouchableOpacity
                    onPress={goToEditBook}
                >  
                <Image source={edit_btn} style={styles.button_book} />
                </TouchableOpacity>     

                <TouchableOpacity>  
                <Image source={delete_btn} style={styles.button_book} />
                </TouchableOpacity>         
            </View>
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
  },
  back_button_area: {
    width: '80%',
    justifyContent: 'flex-start',
    paddingBottom: 150,
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
});