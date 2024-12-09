import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UsuariosScreen = () => {
    const [Usuarios, setUsuarios] = useState([]);
    const navigation = useNavigation();

    const handleAddUsuario = () => {
        navigation.navigate('Usuario', { onSave: addUsuario });
    };

    const addUsuario = (Usuario) => {
        setUsuarios((prevUsuarios) => [...prevUsuarios, Usuario]);
    };

    const handleEditUsuario = (index) => {
        const Usuario = Usuarios[index];
        navigation.navigate('Usuario', { onSave: (updatedUsuario) => updateUsuario(index, updatedUsuario), Usuario });
    };

    const updateUsuario = (index, updatedUsuario) => {
        setUsuarios((prevUsuarios) => {
            const newUsuarios = [...prevUsuarios];
            newUsuarios[index] = updatedUsuario;
            return newUsuarios;
        });
    };

    const handleDeleteUsuario = (index) => {
        setUsuarios((prevUsuarios) => prevUsuarios.filter((_, i) => i !== index));
    };

    const renderUsuario = ({ item, index }) => (
        <View style={styles.UsuarioContainer}>
            <Text style={styles.nombre}>{item.usuario}</Text>
            {item.plazo && <Text style={styles.empresa}>Plazo: {item.plazo}</Text>}
            <Text style={styles.correo}>Contraseña: {item.contrasena}</Text>
            <Text style={styles.correo}>Pregunta Seguridad: {item.preguntaSeguridad}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleEditUsuario(index)}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => handleDeleteUsuario(index)}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddUsuario}>
                <Text style={styles.addButtonText}>Agregar Usuario</Text>
            </TouchableOpacity>
            <FlatList
                data={Usuarios}
                keyExtractor={(item) => item.contrasena} // Asegúrate de que el correo es único
                renderItem={renderUsuario}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E9F9FB',
    },
    UsuarioContainer: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    empresa: {
        fontSize: 14,
        color: '#555',
    },
    correo: {
        fontSize: 14,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    button2: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    addButton: {
        padding: 10,
        backgroundColor: '#28a745',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default UsuariosScreen;
