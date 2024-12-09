import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tooltip from 'react-native-walkthrough-tooltip';

const MenuScreen = ({ navigation }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tooltipVisible, setTooltipVisible] = useState({
    inventario: false,
    facturacion: false,
    cotizacion: false,
    clientes: false,
    usuarios: false,
    transacciones: false,
    soporte: false,
  });

  useEffect(() => {
    const checkIfNewUser = async () => {
      const userStatus = await AsyncStorage.getItem('isNewUser');
      if (userStatus === null) {
        setIsNewUser(true); // Usuario nuevo
        setTooltipVisible({ ...tooltipVisible, inventario: true });
      }
      setLoading(false); // Finaliza la carga
    };

    checkIfNewUser();
  }, []);

  const handleNextTooltip = (current) => {
    if (current === 'inventario') {
      setTooltipVisible({ inventario: false, facturacion: true });
    } else if (current === 'facturacion') {
      setTooltipVisible({ facturacion: false, cotizacion: true });
    } else if (current === 'cotizacion') {
      setTooltipVisible({ cotizacion: false, clientes: true });
    } else if (current === 'clientes') {
      setTooltipVisible({ clientes: false, usuarios: true });
    } else if (current === 'usuarios') {
      setTooltipVisible({ usuarios: false, transacciones: true });
    } else if (current === 'transacciones') {
      setTooltipVisible({ transacciones: false, soporte: true });
    } else if (current === 'soporte') {
      setTooltipVisible({ soporte: false });
      setIsNewUser(false);
      AsyncStorage.setItem('isNewUser', 'false');
    }
  };

  const handlePress = () => {
    Alert.alert('Aviso', 'Aún no está disponible');
  };

  const handlePressInventario = () => {
    navigation.navigate('Inventario');
  };

  const handlePressFacturacion = () => {
    navigation.navigate('Facturacion');
  };

  const handlePressCotizacion = () => {
    navigation.navigate('Cotizacion');
  };

  const handlePressClientes = () => {
    navigation.navigate('Clientes');
  };

  const handlePressChat = () => {
    navigation.navigate('Chat');
  };

  const handleUserPress = () => {
    navigation.navigate('Perfil');
  };

  const handlePressUsuarios = () => {
    navigation.navigate('Usuarios');
  };

  const handlePressLogs = () => {
    navigation.navigate('logs');
  };

  const handlePressTransacciones = () => {
    navigation.navigate('Transacciones');
  };

  if (loading) {
    return <View style={styles.loadingContainer}><Text>Cargando...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={handleUserPress}>
          <Icon name="user" size={30} color="#FFF" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {/* Fila 1 */}
        <View style={styles.row}>
          <Tooltip
            isVisible={tooltipVisible.inventario}
            content={<Text>Aquí puedes gestionar tu inventario.</Text>}
            placement="bottom"
            onClose={() => handleNextTooltip('inventario')}
          >
            <TouchableOpacity style={styles.button} onPress={handlePressInventario}>
              <Icon name="tasks" size={50} color="#FFF" />
              <Text style={styles.buttonText}>Inventario</Text>
            </TouchableOpacity>
          </Tooltip>

          <Tooltip
            isVisible={tooltipVisible.facturacion}
            content={<Text>Gestiona tus facturas aquí.</Text>}
            placement="bottom"
            onClose={() => handleNextTooltip('facturacion')}
          >
            <TouchableOpacity style={styles.button} onPress={handlePressFacturacion}>
              <Icon name="credit-card" size={50} color="#fff" />
              <Text style={styles.buttonText}>Facturación</Text>
            </TouchableOpacity>
          </Tooltip>
        </View>

        {/* Fila 2 */}
        <View style={styles.row}>
          <Tooltip
            isVisible={tooltipVisible.cotizacion}
            content={<Text>Realiza cotizaciones aquí.</Text>}
            placement="bottom"
            onClose={() => handleNextTooltip('cotizacion')}
          >
            <TouchableOpacity style={styles.button} onPress={handlePressCotizacion}>
              <Icon name="calculator" size={50} color="#FFF" />
              <Text style={styles.buttonText}>Cotización</Text>
            </TouchableOpacity>
          </Tooltip>

          <Tooltip
            isVisible={tooltipVisible.clientes}
            content={<Text>Gestiona tu lista de clientes aquí.</Text>}
            placement="bottom"
            onClose={() => handleNextTooltip('clientes')}
          >
            <TouchableOpacity style={styles.button} onPress={handlePressClientes}>
              <Icon name="users" size={50} color="#FFF" />
              <Text style={styles.buttonText}>Clientes</Text>
            </TouchableOpacity>
          </Tooltip>
        </View>

        {/* Fila 3 */}
        <View style={styles.row}>
          <Tooltip
            isVisible={tooltipVisible.usuarios}
            content={<Text>Administra los usuarios de tu sistema.</Text>}
            placement="bottom"
            onClose={() => handleNextTooltip('usuarios')}
          >
            <TouchableOpacity style={styles.button} onPress={handlePressUsuarios}>
              <Icon name="user" size={50} color="#FFF" />
              <Text style={styles.buttonText}>Usuarios</Text>
            </TouchableOpacity>
          </Tooltip>

          <Tooltip
            isVisible={tooltipVisible.transacciones}
            content={<Text>Realiza transacciones aquí.</Text>}
            placement="bottom"
            onClose={() => handleNextTooltip('transacciones')}
          >
            <TouchableOpacity style={styles.button} onPress={handlePressTransacciones}>
              <Icon name="exchange" size={50} color="#FFF" />
              <Text style={styles.buttonText}>Transacciones</Text>
            </TouchableOpacity>
          </Tooltip>
        </View>

        {/* Fila 4 */}
        <View style={styles.row}>
          <Tooltip
            isVisible={tooltipVisible.soporte}
            content={<Text>Obtén soporte y ayuda aquí.</Text>}
            placement="bottom"
            onClose={() => handleNextTooltip('soporte')}
          >
            <TouchableOpacity style={styles.button} onPress={handlePressChat}>
              <Icon name="comments" size={50} color="#FFF" />
              <Text style={styles.buttonText}>Soporte</Text>
            </TouchableOpacity>
          </Tooltip>

          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Próximamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F9FB',
  },
  header: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  logo: {
    marginTop: 30,
    height: 60,
    width: 80,
  },
  icon: {
    marginRight: 20,
    marginTop: 30,
    color: '#105B63',
  },
  grid: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#105B63',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    marginTop: 10,
    color: '#fff',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuScreen
