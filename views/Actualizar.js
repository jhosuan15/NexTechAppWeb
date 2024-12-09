import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

const Actualizar = ({ route, navigation }) => {
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
    
        const updatedProducto = {
            nombre,
            descripcion,
            cantidad: parseInt(cantidad, 10),
            precio: parseFloat(precio),
            codigoBarras,
            imagen,  // La imagen puede ser opcional
        };
    
        try {
            const response = await axios.put(`http://192.168.100.130:5003/api/inventario/${producto.nombre}`, updatedProducto);
            if (response.status === 200) {
                Alert.alert('Éxito', 'Producto actualizado exitosamente.');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'No se pudo actualizar el producto.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al actualizar el producto.');
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
            handleScanBarcode(result.uri);
        }
    };

    const handleScanBarcode = async (imageUri) => {
        // Simulamos la lectura del código de barras. Normalmente, podrías integrar un servicio de detección de código.
        // Aquí deberías utilizar una librería para escanear el código de barras desde la imagen.
        // Como alternativa, se podría integrar Expo Barcode Scanner directamente con la cámara para detectar en tiempo real.
        const detectedBarcode = "1234567890123"; // Simula un código de barras detectado
        setCodigoBarras(detectedBarcode);
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />
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
                editable={false} // El código de barras será capturado automáticamente
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
        backgroundColor: '#fff', // Fondo blanco para los inputs
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

export default Actualizar;
