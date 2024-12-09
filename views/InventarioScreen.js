import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useInventory } from '../contexts/InventoryContext';

const InventarioScreen = () => {
    const { productos, agregarProducto, editarProducto, eliminarProducto } = useInventory();
    const navigation = useNavigation();

    const handleAddProduct = () => {
        navigation.navigate('Producto', { onSave: agregarProducto });
    };

    const handleEditProduct = (producto) => {
        navigation.navigate('Actualizar', {
            onSave: (updatedProduct) => editarProducto(producto.nombre, updatedProduct),
            producto
        });
    };

    const handleDeleteProduct = (nombre) => {
        eliminarProducto(nombre);
    };

    const renderProducto = ({ item }) => (
        <View style={styles.productoContainer}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
            <Text style={styles.cantidad}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.precio}>Precio: ${item.precio.toFixed(2)}</Text>
            <Text style={styles.codigoBarras}>Código de Barras: {item.codigoBarras}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleEditProduct(item)}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => handleDeleteProduct(item.nombre)}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                <Text style={styles.addButtonText}>Agregar Producto</Text>
            </TouchableOpacity>
            <FlatList
                data={productos}
                keyExtractor={(item) => item._id}
                renderItem={renderProducto}
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
    productoContainer: {
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
    descripcion: {
        fontSize: 14,
        color: '#555',
    },
    cantidad: {
        fontSize: 14,
        marginTop: 5,
    },
    precio: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
    },
    codigoBarras: {
        fontSize: 14,
        marginTop: 5,
        color: '#888',
        fontStyle: 'italic',
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

export default InventarioScreen;
