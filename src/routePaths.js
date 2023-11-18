import { useRouter } from 'expo-router';  // Biblioteca de roteamento para o Expo

// Acessando o roteador de 'expo-router'
const route = useRouter();

// Função para navegar até a tela de login
function goToLogin() {
   route.replace('/');
}

// Função para navegar até a tela de registro
function goToRegister() {
   route.replace('/register');
}

// Função para navegar até a tela principal
function goToHome() {
   route.replace('/home');
}

// Função para navegar até a tela de adicionar livro
function goToAddBook() {
   route.replace('/addBook');
}

// Função para navegar até a tela de usuário
function goToProfile() {
   route.replace('/profile');
}

// Exportar as funções
export { 
    goToLogin,
    goToRegister,
    goToHome,
    goToAddBook,
    goToProfile
 };