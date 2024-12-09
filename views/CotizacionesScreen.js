import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { useNavigation } from '@react-navigation/native';
import { useInventory } from '../contexts/InventoryContext'; // Asegúrate de que la ruta sea correcta

const CotizacionesScreen = () => {
  const { productos } = useInventory(); // Usar el contexto para obtener productos
  const [CotizacionItems, setCotizacionItems] = useState([]);
  const [costoExtras, setCostoExtras] = useState([{ titulo: '', monto: '' }]);
  const [nombreCliente, setNombreCliente] = useState('');
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [email, setEmail] = useState('');
  const [Cotizaciones, setCotizaciones] = useState([]);
  const navigation = useNavigation();

  const agregarProductoACotizacion = (producto, cantidad) => {
    const productoConCantidad = { ...producto, cantidad };
    setCotizacionItems((prev) => [...prev, productoConCantidad]);
  };

  const eliminarProducto = (id) => {
    setCotizacionItems((prev) => prev.filter(item => item.id !== id));
  };

  const agregarCostoExtra = () => {
    setCostoExtras((prev) => [...prev, { titulo: '', monto: '' }]);
  };

  const calcularTotal = () => {
    const subtotal = CotizacionItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    const totalCostoExtras = costoExtras.reduce((total, costo) => total + (parseFloat(costo.monto) || 0), 0);
    const total = subtotal + totalCostoExtras;
    return total.toFixed(2);
  };

  const enviarCotizacionPorCorreo = async () => {
    // Validar campos obligatorios
    if (!nombreCliente || !nombreEmpleado || !email) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }

    const total = calcularTotal();
    const body = `
      Cotizacion de NexTech
      ----------------------
      Cliente: ${nombreCliente}
      Empleado: ${nombreEmpleado}
      Productos:
      ${CotizacionItems.map(item => `${item.nombre} (x${item.cantidad}): $${(item.precio * item.cantidad).toFixed(2)}`).join('\n')}
      Costos Extras:
      ${costoExtras.map(costo => `${costo.titulo}: $${costo.monto}`).join('\n')}
      ----------------------
      Total: $${total}
      ¡Gracias por su preferencia!
    `;

    const options = {
      recipients: [email],
      subject: 'Cotizacion de NexTech',
      body: body,
    };

    const result = await MailComposer.composeAsync(options);
    if (result.status === 'sent') {
      Alert.alert('Cotizacion enviada', 'La Cotizacion ha sido enviada correctamente.');
      setCotizaciones(prev => [...prev, { items: CotizacionItems, costoExtras, total }]);
      setCotizacionItems([]);
      setCostoExtras([{ titulo: '', monto: '' }]);
      setNombreCliente('');
      setNombreEmpleado('');
      setEmail('');
    } else {
      Alert.alert('Error', 'No se pudo enviar la Cotizacion. Inténtalo de nuevo.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text>{item.nombre} - $ {item.precio.toFixed(2)} (x{item.cantidad})</Text>
      <TouchableOpacity style={styles.button} onPress={() => eliminarProducto(item.id)}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCostoExtra = ({ item, index }) => (
    <View style={styles.costoItem}>
      <TextInput
        placeholder="Título del Costo Extra"
        value={item.titulo}
        onChangeText={(text) => {
          const nuevosCostos = [...costoExtras];
          nuevosCostos[index].titulo = text;
          setCostoExtras(nuevosCostos);
        }}
        style={styles.inputTitulo}
      />
      <TextInput
        placeholder="Monto"
        value={item.monto}
        keyboardType="numeric"
        onChangeText={(text) => {
          const nuevosCostos = [...costoExtras];
          nuevosCostos[index].monto = text;
          setCostoExtras(nuevosCostos);
        }}
        style={styles.inputCosto}
      />
    </View>
  );

  const irAHistorialCotizaciones = () => {
    if (Cotizaciones.length === 0) {
      Alert.alert('Sin Cotizaciones', 'No hay Cotizaciones disponibles.');
    } else {
      navigation.navigate('HistorialCotizaciones');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Nombre del Cliente"
        value={nombreCliente}
        onChangeText={setNombreCliente}
        style={styles.input}
      />
      <TextInput
        placeholder="Nombre del Empleado"
        value={nombreEmpleado}
        onChangeText={setNombreEmpleado}
        style={styles.input}
      />
      <TextInput
        placeholder="Email para enviar Cotizacion"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SeleccionProductos', { agregarProductoACotizacion })}>
        <Text style={styles.buttonText}>Seleccionar Productos</Text>
      </TouchableOpacity>
      <FlatList
        data={CotizacionItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
      />
      <FlatList
        data={costoExtras}
        renderItem={renderCostoExtra}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
      <TouchableOpacity style={styles.button} onPress={agregarCostoExtra}>
        <Text style={styles.buttonText}>Agregar Costo Extra</Text>
      </TouchableOpacity>
      <Text style={styles.totalText}>Total: $ {calcularTotal()}</Text>
      <TouchableOpacity style={styles.button} onPress={enviarCotizacionPorCorreo}>
        <Text style={styles.buttonText}>Enviar Cotizacion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.historialButton]} onPress={irAHistorialCotizaciones}>
        <Text style={styles.buttonText}>Historial de Cotizaciones</Text>
      </TouchableOpacity>
    </ScrollView>
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
    color: '#105B63',
  },
  productItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  historialButton: {
    marginBottom: 40,
  },
  costoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#105B63',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputTitulo: {
    height: 50,
    width: '60%',
    borderColor: '#105B63',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputCosto: {
    height: 50,
    width: '30%',
    borderColor: '#105B63',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#105B63',
  },
  button: {
    backgroundColor: '#105B63',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  flatList: {
    marginBottom: 20,
  },
});

export default CotizacionesScreen;
