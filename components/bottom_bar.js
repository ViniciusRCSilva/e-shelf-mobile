import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'

import home_btn from '../assets/house_button.png'
import add_btn from '../assets/add_button.png'
import user_btn from '../assets/user_button.png'
import { useRouter } from 'expo-router'

export default function BottomBar() {
    const route = useRouter()

    function goToHome(){
        route.replace('/home')
    }

    function goToAddBook(){
        route.replace('/addBook')
    }

    function goToProfile(){
        route.replace('/profile')
    }

    return (
        <View style={styles.bottom_bar} >
            <TouchableOpacity
            onPress={goToHome}
            >
                <Image source={home_btn} style={styles.btn_lateral} />
            </TouchableOpacity>

            <TouchableOpacity
            onPress={goToAddBook}
            >
                <Image source={add_btn} style={styles.btn_middle} />
            </TouchableOpacity>

            <TouchableOpacity
            onPress={goToProfile}
            >
                <Image source={user_btn} style={styles.btn_lateral} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  bottom_bar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    paddingBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    backgroundColor: '#E0D4C5',
    borderColor: '#D0BFA8',
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  btn_middle: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  btn_lateral: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});