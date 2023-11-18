// Importando módulos e componentes necessários do React Native
import { Image, TouchableOpacity, View, StatusBar } from 'react-native'

// Importando ícones da barra inferior
import home_btn from '../assets/house_button.png'
import add_btn from '../assets/add_button.png'
import user_btn from '../assets/user_button.png'

import { goToAddBook, goToHome, goToProfile } from '../src/routePaths'
import { bottomBarStyle } from '../styles/style'

// Componente funcional para a barra inferior de navegação
export default function BottomBar() {
    // JSX para renderizar o componente da barra inferior
    return (
        <View style={bottomBarStyle.container} >
            {/* Botão para ir para a tela inicial */}
            <TouchableOpacity
                onPress={goToHome}
            >
                <Image source={home_btn} style={bottomBarStyle.btnLateral} />
            </TouchableOpacity>

            {/* Botão para ir para a tela de adição de livro */}
            <TouchableOpacity
                onPress={goToAddBook}
            >
                <Image source={add_btn} style={bottomBarStyle.btnMiddle} />
            </TouchableOpacity>

            {/* Botão para ir para a tela de perfil do usuário */}
            <TouchableOpacity
                onPress={goToProfile}
            >
                <Image source={user_btn} style={bottomBarStyle.btnLateral} />
            </TouchableOpacity>

            <StatusBar barStyle="dark-content" />
        </View>
    );
}