import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetallesFactura = ({ route }) => {
  const { factura } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Factura</Text>
      <Text>Cliente: {factura.nombreCliente}</Text>
      <Text>Empleado: {factura.nombreEmpleado}</Text>
      <Text>Email: {factura.email}</Text>
      <Text>Productos: {factura.productos.join(', ')}</Text>
      <Text>Costo Extras: ${factura.costoExtras}</Text>
      <Text>Total: ${factura.total}</Text>
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
});

export default DetallesFactura;
