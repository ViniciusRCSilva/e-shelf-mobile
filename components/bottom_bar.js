// Importando módulos e componentes necessários do React Native
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'

// Importando ícones da barra inferior
import home_btn from '../assets/house_button.png'
import add_btn from '../assets/add_button.png'
import user_btn from '../assets/user_button.png'

// Importando módulo de roteamento do Expo
import { useRouter } from 'expo-router'

// Componente funcional para a barra inferior de navegação
export default function BottomBar() {
    // Obtendo o roteador para navegação
    const route = useRouter()

    // Função para navegar para a tela inicial
    function goToHome(){
        route.replace('/home')
    }

    // Função para navegar para a tela de adição de livro
    function goToAddBook(){
        route.replace('/addBook')
    }

    // Função para navegar para a tela de perfil do usuário
    function goToProfile(){
        route.replace('/profile')
    }

    // JSX para renderizar o componente da barra inferior
    return (
        <View style={styles.bottom_bar} >
            {/* Botão para ir para a tela inicial */}
            <TouchableOpacity
                onPress={goToHome}
            >
                <Image source={home_btn} style={styles.btn_lateral} />
            </TouchableOpacity>

            {/* Botão para ir para a tela de adição de livro */}
            <TouchableOpacity
                onPress={goToAddBook}
            >
                <Image source={add_btn} style={styles.btn_middle} />
            </TouchableOpacity>

            {/* Botão para ir para a tela de perfil do usuário */}
            <TouchableOpacity
                onPress={goToProfile}
            >
                <Image source={user_btn} style={styles.btn_lateral} />
            </TouchableOpacity>
        </View>
    );
}

// Estilos para o componente da barra inferior
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