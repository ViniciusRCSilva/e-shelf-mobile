import { StyleSheet } from "react-native";

// Estilos
const global = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    color: '#C1AA8B',
  },
  textLink: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#C1AA8B',
  },
  title: {
    color: '#C1AA8B',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bar: {
    width: 250,
    height: 5,
    backgroundColor: '#D0BFA8',
    borderRadius: 100,
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
  button: {
    width: 200,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C1AA8B',
    borderRadius: 100,
  },
  buttonText: {
    color: '#fff',
  },
  buttonActionBook: {
    padding: 15,
    backgroundColor: '#C1AA8B',
    borderRadius: 100,
  },
  cancelButton: {
    backgroundColor: '#B42929',
    padding: 15,
    borderRadius: 100,
  },
  cancelText: {
    color: '#fff',
  },
  ReturnButtonArea: {
    width: '80%',
    justifyContent: 'flex-start',
  },
  ReturnButton: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    paddingTop: 50,
    gap: 50,
    overflow: 'visible',
  },
});

const actionBookStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    paddingTop: 100,
    gap: 30,
  },
  buttonsArea: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBookArea: {
    alignItems: 'center',
    gap: 20,
    paddingTop: 80,
  },
});

const profileStyle = StyleSheet.create({
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
  signOutButton: {
    width: 100,
    resizeMode: 'contain',
  },
});

const bottomBarStyle = StyleSheet.create({
  container: {
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
  btnMiddle: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  btnLateral: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

const modalStyles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEAE2',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    gap: 20
  },
  bookInfoArea: {
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  bookButtonsArea: {
    flexDirection: 'row',
    gap: 20,
  },
  bookButton: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  inputBookArea: {
    alignItems: 'center',
    gap: 20,
    paddingVertical: 20,
  },
})

const bookBoxStyle = StyleSheet.create({
  button: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  info: {
    width: '40%',
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
  actionButtonsArea: {
    width: '40%',
    justifyContent: 'flex-end',
    gap: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bookButton: {
    width: 40,
    height: 40,
  }
})

export { 
    global,
    homeStyle,
    actionBookStyle,
    profileStyle,
    bookBoxStyle,
    modalStyles,
    bottomBarStyle,
}