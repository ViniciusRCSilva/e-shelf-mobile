import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';

import BottomBar from '../components/bottom_bar';
import back_btn from '../assets/cancel_button.png'
import { useRouter } from 'expo-router';

export default function AddBook() {
    const [bookName, setBookName] = useState('');
    const [bookValue, setBookValue] = useState('');
    const route = useRouter()

    function goToHome() {
        route.replace('/home')
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

            <View style={styles.book_input}>            
                <Text style={styles.title}>Adicionar Livro</Text>
                <TextInput 
                    keyboardAppearance='dark'
                    style={styles.input}
                    value={bookName}
                    onChangeText={setBookName}
                    placeholder='Nome' 
                    placeholderTextColor="#C4C4C4"
                />
                <TextInput 
                    keyboardAppearance='dark'
                    keyboardType='numeric'
                    style={styles.input}
                    value={bookValue}
                    onChangeText={setBookValue}
                    placeholder='Valor' 
                    placeholderTextColor="#C4C4C4"
                />
            </View>

            <View style={styles.buttons_area}>
                <TouchableOpacity
                    onPress={goToHome}
                    style={styles.add_button}
                >
                    <Text style={styles.add_text}>Adicionar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={goToHome}
                    style={styles.cancel_button}
                >
                    <Text style={styles.cancel_text}>Cancelar</Text>
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
});