import { StyleSheet, Image, TouchableOpacity, View, Text } from 'react-native'

import edit_btn from '../assets/edit_button.png'
import delete_btn from '../assets/delete_button.png'
import book_icon from '../assets/book_icon.png'
import { useRouter } from 'expo-router'

export default function Books(props) {
    const route = useRouter()

    function goToBook(){
        route.replace('/book')
    }

    function goToEditBook(){
        route.replace('/editBook')
    }

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={goToBook}
        >
            <View style={styles.info}>
            <Image source={book_icon} style={styles.icon} />
                
            <View>
                <Text style={styles.title}>{props.nome}</Text>
                <Text style={styles.text}>R$ {props.valor}</Text>
            </View>
            </View>

            <View style={styles.action_buttons} >
                <TouchableOpacity
                onPress={goToEditBook}
                >
                    <Image source={edit_btn} style={styles.book_button} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={delete_btn} style={styles.book_button} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  info: {
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
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  book_button: {
    width: 40,
    height: 40,
  }
});