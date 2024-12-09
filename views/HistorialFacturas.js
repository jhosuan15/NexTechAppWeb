import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HistorialFacturas = ({ route }) => {
  const navigation = useNavigation();
  const { facturas: initialFacturas } = route.params;
  const [facturas, setFacturas] = useState(initialFacturas);

  const eliminarFactura = (id) => {
    // Aquí se realizaría la llamada a la API para eliminar la factura
    fetch(`http://192.168.100.130:5003/api/facturas/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Filtramos las facturas para eliminar la que se ha borrado
          setFacturas(facturas.filter(factura => factura._id !== id));
          Alert.alert('Éxito', 'Factura eliminada correctamente');
        } else {
          Alert.alert('Error', 'No se pudo eliminar la factura');
        }
      })
      .catch(error => {
        console.error('Error al eliminar la factura:', error);
        Alert.alert('Error', 'Hubo un problema al eliminar la factura');
      });
  };

  const verDetalles = (factura) => {
    navigation.navigate('DetallesFactura', { factura });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Facturas</Text>
      <FlatList
        data={facturas}
        renderItem={({ item }) => (
          <View style={styles.facturaItem}>
            <TouchableOpacity onPress={() => verDetalles(item)}>
              <Text>{`Factura: Total $${item.total}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eliminarFactura(item._id)} style={styles.botonEliminar}>
              <Text style={styles.textoEliminar}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item._id}
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
  facturaItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botonEliminar: {
    backgroundColor: '#E74C3C',
    borderRadius: 5,
    padding: 10,
  },
  textoEliminar: {
    color: '#fff',
  },
});

export default HistorialFacturas;
