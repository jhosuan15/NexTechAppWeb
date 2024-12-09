import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useInventory } from '../contexts/InventoryContext'; // Asegúrate de que la ruta sea correcta

const SeleccionProductosCotizaciones = ({ navigation, route }) => {
  const { productos } = useInventory(); // Obteniendo productos del contexto
  const { agregarProductoAFactura } = route.params; // Obtener la función desde las props

  // Estado para la cantidad seleccionada
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState({});

  const renderItem = ({ item }) => {
    const cantidadDisponible = item.cantidad; // Cambié esto para usar 'cantidad' en lugar de 'cantidadDisponible'
    
    return (
      <View style={styles.productoContainer}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.descripcion}>{item.descripcion}</Text>
        <Text style={styles.precio}>Precio: ${item.precio.toFixed(2)}</Text>
        <Text style={styles.cantidadDisponible}>Cantidad Disponible: {cantidadDisponible}</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Cantidad"
          value={cantidadSeleccionada[item._id]?.toString() || ''} // Cambié 'id' a '_id'
          onChangeText={(value) => {
            const cantidad = parseInt(value) || 0;
            // Limitar la cantidad a la disponible
            if (cantidad <= cantidadDisponible) {
              setCantidadSeleccionada({ ...cantidadSeleccionada, [item._id]: cantidad }); // Cambié 'id' a '_id'
            }
          }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const cantidad = cantidadSeleccionada[item._id] || 1; // Por defecto, 1 si no hay valor
              agregarProductoAFactura({ ...item, cantidad }); // Llamar a la función para agregar producto con cantidad
              navigation.goBack(); // Volver a la pantalla de facturación
            }}
          >
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar Productos</Text>
      <FlatList
        data={productos}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()} // Asegúrate de que '_id' sea un string
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2C3E50',
  },
  productoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#105B63',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  precio: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cantidadDisponible: {
    fontSize: 14,
    marginTop: 5,
    color: '#e67e22',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#105B63',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  volverButton: {
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  volverButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SeleccionProductosCotizaciones;
