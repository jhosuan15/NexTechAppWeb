// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './views/HomeScreen';
import LoginScreen from './views/LoginScreen';
import MenuScreen from './views/MenuScreen';
import InventarioScreen from './views/InventarioScreen';
import ProductoScreen from './views/ProductoScreen';
import FacturacionScreen from './views/FacturacionScreen';
import { InventoryProvider } from './contexts/InventoryContext';
import SeleccionProductos from './views/SeleccionProductos';
import HistorialFacturas from './views/HistorialFacturas';
import CotizacionesScreen from './views/CotizacionesScreen';
import HistorialCotizaciones from './views/HistorialCotizaciones';
import SeleccionProductoCotizaciones from './views/SeleccionProductoCotizaciones';
import ClientesScreen from './views/ClientesScreen';
import ClienteScreen from './views/ClienteScreen';
import ChatSupport from './views/ChatSupport';
import ProfileScreen from './views/ProfileScreen';
import DetallesFactura from './views/DetallesFactura';
import Actualizar from './views/Actualizar';
import UsuariosScreen from './views/UsuariosScreen';
import UsuarioScreen from './views/UsuarioScreen';
import VerificacionSMS from './views/VerificacionSMS';
import Logs from './views/Logs';
import Transacciones from './views/Transacciones';
import { LoginLogProvider } from './contexts/LoginContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LoginLogProvider>
      <InventoryProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#E9F9FB', // Cambia el color de fondo del encabezado aquí
              },
              headerTintColor: '#105B63', // Color del texto y los íconos en el encabezado
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
            <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Inventario" component={InventarioScreen} options={{ title: 'Inventario' }} />
            <Stack.Screen name="Producto" component={ProductoScreen} options={{ title: 'Productos' }} />
            <Stack.Screen
              name="Facturacion"
              component={FacturacionScreen}
              options={{ title: 'Facturación' }}
            />
            <Stack.Screen name="SeleccionProductos" component={SeleccionProductos} options={{ title: 'Productos' }} />
            <Stack.Screen name="HistorialFacturas" component={HistorialFacturas} options={{ title: 'Facturas' }} />
            <Stack.Screen
              name="Cotizacion"
              component={CotizacionesScreen}
              options={{ title: 'Cotización' }}
            />
            <Stack.Screen name="SeleccionProductoCotizaciones" component={SeleccionProductoCotizaciones} options={{ title: 'Cotización' }} />
            <Stack.Screen name="HistorialCotizaciones" component={HistorialCotizaciones} options={{ title: 'Cotización' }} />
            <Stack.Screen name="Clientes" component={ClientesScreen} />
            <Stack.Screen name="Cliente" component={ClienteScreen} />
            <Stack.Screen name="Chat" component={ChatSupport} />
            <Stack.Screen name="Perfil" component={ProfileScreen} />
            <Stack.Screen name="DetallesFactura" component={DetallesFactura} />
            <Stack.Screen name="Actualizar" component={Actualizar} />
            <Stack.Screen name="Usuarios" component={UsuariosScreen} />
            <Stack.Screen name="Usuario" component={UsuarioScreen} />
            <Stack.Screen name="Sms" component={VerificacionSMS} />
            <Stack.Screen name="logs" component={Logs} />
            <Stack.Screen name="Transacciones" component={Transacciones} />
          </Stack.Navigator>
        </NavigationContainer>
      </InventoryProvider>
    </LoginLogProvider>
  );
}
