import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';

const VerificacionSMS = ({ navigation, route }) => {
    // Generar un código aleatorio entre 100000 y 999999
    const [generatedCode, setGeneratedCode] = useState('');
    const [inputCode, setInputCode] = useState('');

    useEffect(() => {
        // Genera un código de verificación al cargar la pantalla
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(code);

        // Muestra el código en un Alert para el usuario
        Alert.alert("Código de Verificación", `Tu código es: ${code}`);
    }, []);

    // Función para verificar el código ingresado
    const handleVerifyCode = () => {
        if (inputCode === generatedCode) {
            Alert.alert("Verificación exitosa", "El código es correcto.");
            // Navega a la siguiente pantalla o realiza otra acción
            navigation.navigate("UsuariosScreen"); // Cambia "SiguientePantalla" por el nombre de la pantalla siguiente
        } else {
            Alert.alert("Error", "El código ingresado es incorrecto.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ingresa el código de verificación:</Text>
            <TextInput
                style={styles.input}
                placeholder="Código de verificación"
                keyboardType="numeric"
                value={inputCode}
                onChangeText={setInputCode}
            />
            <Button title="Verificar Código" onPress={handleVerifyCode} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E9F9FB', padding: 20 },
    input: { height: 40, borderColor: '#105B63', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10, width: '80%', textAlign: 'center', borderRadius: 5, backgroundColor: '#fff' },
    text: { fontSize: 16, marginBottom: 20 }
});

export default VerificacionSMS;
