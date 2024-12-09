import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ClientesScreen = () => {
    const [clientes, setClientes] = useState([]);
    const navigation = useNavigation();

    const handleAddCliente = () => {
        navigation.navigate('Cliente', { onSave: addCliente });
    };

    const addCliente = (cliente) => {
        setClientes((prevClientes) => [...prevClientes, cliente]);
    };

    const handleEditCliente = (index) => {
        const cliente = clientes[index];
        navigation.navigate('Cliente', { onSave: (updatedCliente) => updateCliente(index, updatedCliente), cliente });
    };

    const updateCliente = (index, updatedCliente) => {
        setClientes((prevClientes) => {
            const newClientes = [...prevClientes];
            newClientes[index] = updatedCliente;
            return newClientes;
        });
    };

    const handleDeleteCliente = (index) => {
        setClientes((prevClientes) => prevClientes.filter((_, i) => i !== index));
    };

    const renderCliente = ({ item, index }) => (
        <View style={styles.clienteContainer}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            {item.empresa && <Text style={styles.empresa}>Empresa: {item.empresa}</Text>}
            <Text style={styles.correo}>Correo: {item.correo}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleEditCliente(index)}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => handleDeleteCliente(index)}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddCliente}>
                <Text style={styles.addButtonText}>Agregar Cliente</Text>
            </TouchableOpacity>
            <FlatList
                data={clientes}
                keyExtractor={(item) => item.correo} // Asegúrate de que el correo es único
                renderItem={renderCliente}
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
    clienteContainer: {
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

export default ClientesScreen;
