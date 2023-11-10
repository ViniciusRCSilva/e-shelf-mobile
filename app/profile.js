import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import BottomBar from '../components/bottom_bar';
import SignOutBtn from '../assets/signOut_button.png'
import userIcon from '../assets/user_icon.png'
import { auth } from '../src/firebaseConfig';
import { useRouter } from 'expo-router';

export default function User() {
    const [user, setUser] = useState('');

    const route = useRouter()

    function goToLogin() {
        route.replace('/')
    }

    useEffect(() => {
        setUser(auth.currentUser.email)
    }, [user])

    return (
        <View style={styles.container}>
        <Image source={userIcon} style={styles.icon} />
        <Text style={styles.title}>{user}</Text>
        <Text style={styles.text}>Total de Livros cadastrados:</Text>
        <Text style={styles.text}>3</Text>

        <TouchableOpacity 
            onPress={goToLogin}
        >
            <Image source={SignOutBtn} style={styles.button} />
        </TouchableOpacity>

        <BottomBar />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    overflow: 'visible',
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    color: '#C1AA8B',
    fontSize: 32,
    fontWeight: 'bold',
  },
  text: {
    color: '#C1AA8B',
    fontSize: 20,
  },
  button: {
    width: 100,
    resizeMode: 'contain',
  },
});