import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HistorialFacturas = ({ route }) => {
  const { facturas } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Facturas</Text>
      <FlatList
        data={facturas}
        renderItem={({ item, index }) => (
          <View style={styles.facturaItem}>
            <Text>{`Factura ${index + 1}: Total $${item.total}`}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
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
  },
});

export default HistorialFacturas;
