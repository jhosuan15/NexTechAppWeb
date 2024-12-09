// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handlePressLogin = () => {
    navigation.navigate('Login'); // Navega a la pantalla de inicio de sesión
  };


  return (
    <View style={styles.container}>
      <Image source={require('../assets/image.gif')} style={styles.logo} />
      <Text style={styles.textTitle}>BIENVENIDO</Text>
      <Text style={styles.text}>Inicia sesión para acceder a tus tareas y herramientas de trabajo.</Text>
      <TouchableOpacity style={styles.button} onPress={handlePressLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F9FB',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  button: {
    backgroundColor: '#105B63',
    padding: 15,
    borderRadius: 50,
    marginTop: 30,
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  logo: {
    height: 250,
    width: 250,
  },
  textTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#105B63',
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;
