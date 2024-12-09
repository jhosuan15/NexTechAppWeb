import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, TouchableOpacity, Text } from 'react-native';

const ClienteScreen = ({ route, navigation }) => {
    const { cliente, onSave } = route.params || {};

    const [nombre, setNombre] = useState(cliente?.nombre || '');
    const [empresa, setEmpresa] = useState(cliente?.empresa || '');
    const [correo, setCorreo] = useState(cliente?.correo || '');
    const [cedula, setCedula] = useState(''); // Agregar estado para cédula

    // Función para buscar el nombre según la cédula
    const buscarPersona = async () => {
        if (!cedula) {
            Alert.alert('Error', 'Por favor ingrese una cédula.');
            return;
        }

        try {
            const response = await fetch(`http://192.168.100.130:5002/personas/${cedula}`);
            if (response.ok) {
                const data = await response.json();
                console.log('Nombre obtenido:', data.nombre); // Debugging: Verifica si se recibe el nombre
                setNombre(data.nombre); // Establece el nombre recibido en el estado
            } else {
                const errorData = await response.json();
                Alert.alert('Error', errorData.error || 'Persona no encontrada.');
                setNombre(''); // Limpia el nombre si no se encuentra la persona
            }
        } catch (error) {
            console.error('Error al buscar persona:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor.');
        }
    };

    const handleSave = () => {
        if (!nombre || !correo) {
            Alert.alert('Error', 'El nombre y el correo son obligatorios.');
            return;
        }

        const newCliente = {
            nombre,
            empresa,
            correo,
        };

        onSave(newCliente);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Input para la cédula */}
            <TextInput
                placeholder="Cédula"
                value={cedula}
                onChangeText={setCedula}
                style={styles.input}
                keyboardType="numeric"
            />
            {/* Botón para buscar el nombre */}
            <TouchableOpacity style={styles.buttonBuscar} onPress={buscarPersona}>
                <Text style={styles.buttonText}>Buscar Nombre</Text>
            </TouchableOpacity>

            {/* Input para el nombre */}
            <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />

            <TextInput
                placeholder="Empresa (Opcional)"
                value={empresa}
                onChangeText={setEmpresa}
                style={styles.input}
            />
            <TextInput
                placeholder="Correo"
                value={correo}
                onChangeText={setCorreo}
                style={styles.input}
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.buttonGuardar} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E9F9FB',
    },
    input: {
        height: 40,
        borderColor: '#105B63',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    buttonGuardar: {
        padding: 10,
        backgroundColor: '#28a745',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonBuscar: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ClienteScreen;
