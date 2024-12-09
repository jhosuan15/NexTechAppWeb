import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ProductoScreen = ({ route, navigation }) => {
    const { producto, onSave } = route.params || {};

    const [nombre, setNombre] = useState(producto?.nombre || '');
    const [descripcion, setDescripcion] = useState(producto?.descripcion || '');
    const [cantidad, setCantidad] = useState(producto?.cantidad || '');
    const [precio, setPrecio] = useState(producto?.precio || '');
    const [codigoBarras, setCodigoBarras] = useState(producto?.codigoBarras || '');
    const [imagen, setImagen] = useState(null);

    const handleSave = async () => {
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
            imagen,  // La imagen puede ser opcional
        };

        try {
            const response = await axios.post('http://192.168.100.130:5003/api/inventario/', newProducto);
            if (response.status === 201) {
                Alert.alert('Éxito', 'Producto guardado exitosamente.');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'No se pudo guardar el producto.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al guardar el producto.');
        }
    };

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permiso para acceder a la galería es necesario.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImagen(result.uri);
        }
    };

    const handleFetchPrecio = async () => {
        try {
            const response = await axios.get(`http://192.168.100.130:5002/productos/${nombre}`);
            if (response.status === 200) {
                const producto = response.data;
                setPrecio(producto.precio);  // Asumimos que el precio viene en el objeto
            } else {
                Alert.alert('Error', 'Producto no encontrado.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo obtener el precio del producto.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleFetchPrecio}>
                <Text style={styles.buttonText}>Obtener Precio</Text>
            </TouchableOpacity>
            <TextInput
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
                style={styles.input}
            />
            <TextInput
                placeholder="Cantidad"
                value={cantidad.toString()}
                onChangeText={text => setCantidad(text.replace(/[^0-9]/g, ''))} // Solo números
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Precio"
                value={precio.toString()}
                onChangeText={text => setPrecio(text.replace(/[^0-9.]/g, ''))} // Solo números y punto
                keyboardType="decimal-pad"
                style={styles.input}
            />
            <TextInput
                placeholder="Código de Barras"
                value={codigoBarras}
                onChangeText={setCodigoBarras}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handlePickImage}>
                <Text style={styles.buttonText}>Escanear Código de Barras</Text>
            </TouchableOpacity>
            {imagen && <Image source={{ uri: imagen }} style={styles.imagen} />}
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
    button: {
        padding: 10,
        backgroundColor: '#105B63',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonGuardar: {
        padding: 10,
        backgroundColor: '#28a745',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    imagen: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
    },
});

export default ProductoScreen;
