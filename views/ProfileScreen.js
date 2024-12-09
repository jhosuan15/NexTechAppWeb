// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = ({ route, navigation }) => {
    const handleSave = () => {
        if (!nombre || !descripcion || cantidad === '' || precio === '' || !codigoBarras) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }
    
        const newProducto = {
            nombre,
            descripcion,
            cantidad: parseInt(cantidad, 10),
            precio: parseFloat(precio),
            codigoBarras,
        };
    
        onSave(newProducto);
        navigation.goBack();
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.containerUser}>
                <Icon name="user" size={30} color="#FFF" style={styles.profilePicture} />
            </View>
            <Text style={styles.name}>Usuario</Text>
            <Text style={styles.email}>Usuario@nextech.com</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Salir</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E9F9FB',
    },
    containerUser: {
        marginTop: '10%',
        marginBottom: '10%',
        height: 150,
        width: 150,
        backgroundColor: '#105B63',
        borderRadius: 100,
        alignItems: 'center',  // Centra horizontalmente
        justifyContent: 'center',  // Centra verticalmente
    },
    button: {
        marginTop: '10%',
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 15,
        width: '50%',
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    profilePicture: {
        width: 30, // Ajusta el tamaño del ícono según lo necesites
        height: 30, // Ajusta el tamaño del ícono según lo necesites
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: '#777',
    },
});

export default ProfileScreen;
