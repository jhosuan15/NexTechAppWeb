import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useLoginLog } from '../contexts/LoginContext'; // Importa el contexto

const LoginScreen = () => {
  const navigation = useNavigation();
  const { logAttempt } = useLoginLog(); // Usa el contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTime, setBlockTime] = useState(15); // Bloqueo de 15 segundos

  useEffect(() => {
    let timer;
    if (isBlocked && blockTime > 0) {
      timer = setInterval(() => {
        setBlockTime(prevTime => {
          if (prevTime <= 1) {
            setIsBlocked(false);
            setAttemptCount(0);
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (blockTime === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isBlocked, blockTime]);

  const handlePressContinue = async () => {
    if (isBlocked) {
      Alert.alert('Sistema Bloqueado', `Demasiados intentos. Intenta de nuevo en ${blockTime} segundos.`);
      return;
    }

    if (email === "admin" && password === "admin") {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Menu' }],
      });
      logAttempt(email, true); // Log de intento exitoso
      return;
    }

    try {
      const response = await axios.post('http://192.168.100.130:5002/login', {
        usuario: email // Cambiar "email" por "usuario" en el objeto enviado
      });
    
      if (response.status === 200) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Menu' }],
        });
        logAttempt(email, true); // Log de intento exitoso
      } else {
        handleFailedAttempt();
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Hubo un problema al iniciar sesión';
      Alert.alert('Error', errorMessage);
      handleFailedAttempt();
    }
  };    

  const handleFailedAttempt = async () => {
    setAttemptCount(prevCount => prevCount + 1);
    logAttempt(email, false); // Log de intento fallido
  
    if (attemptCount + 1 >= 3) {
      setIsBlocked(true);
      try {
        // Llama a la API para actualizar el estado del usuario
        await axios.put(`http://192.168.100.130:5003/api/users/${email}/status`, { status: false });
      } catch (error) {
        console.error('Error al actualizar el estado del usuario:', error);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.cont}>
        <Text style={styles.textTitle}>Iniciar sesión</Text>

        <TextInput
          style={emailFocused ? styles.inputFocused : styles.input}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          placeholder="Usuario"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={passwordFocused ? styles.inputFocused : styles.input}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handlePressContinue}
          disabled={isBlocked}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        {isBlocked && (
          <Text style={styles.blockedMessage}>Sistema bloqueado. Intenta de nuevo en {blockTime} segundos.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#105B63',
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
  input: {
    height: 50,
    width: '90%',
    borderColor: '#006752',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  inputFocused: {
    height: 50,
    width: '90%',
    borderColor: '#006752',
    backgroundColor: '#eafaf1',
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  cont: {
    backgroundColor: '#fff',
    height: 450,
    width: 320,
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
  },
  textTitle: {
    marginTop: 30,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#105B63',
    textAlign: 'center',
  },
  blockedMessage: {
    marginTop: 20,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
