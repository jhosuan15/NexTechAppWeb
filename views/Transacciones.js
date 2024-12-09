import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const Transacciones = () => {
    const [transaccionExito, setTransaccionExito] = useState(false);
    const [tipoCambio, setTipoCambio] = useState(1); // Inicializamos tipo de cambio en 1 para pruebas
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [montoUSD, setMontoUSD] = useState('');
    const [montoLocal, setMontoLocal] = useState('');
 //API Banco Central
    const obtenerTipoCambio = async () => {
        try {
            const response = await axios.get('https://centralenlinea.bccr.fi.cr/api/%20Bccr.GE.CPF.CMEP.Exportar.API/DatosPublicados/ObtengaDatosUltimoPeriodoPublicado?correo=jhosuanaligonzalez@hotmail.com&token=13OZSSSOLA');
            console.log('Datos del tipo de cambio:', response.data); // Verifica la estructura de los datos recibidos

            // Verificar si la estructura de los datos es correcta
            if (response.data && response.data.USD && response.data.USD[0] && response.data.USD[0].valor) {
                const tipoCambioUSD = response.data.USD[0].valor;
                setTipoCambio(parseFloat(tipoCambioUSD));
            } else {
                console.error('Estructura de datos no válida para tipo de cambio');
                Alert.alert('Error', 'No se pudo obtener el tipo de cambio.');
            }
        } catch (error) {
            console.error('Error al obtener tipo de cambio:', error);
            Alert.alert('Error', 'No se pudo obtener el tipo de cambio.');
        }
    };

    // Función para realizar la transacción a la API Flask
    const realizarPago = async () => {
        if (numeroTarjeta.length < 13 || numeroTarjeta.length > 16) {
            Alert.alert('Error', 'El número de tarjeta debe tener entre 13 y 16 dígitos.');
            return;
        }

        if (isNaN(montoUSD) || montoUSD <= 0) {
            Alert.alert('Error', 'El monto debe ser un número positivo.');
            return;
        }

        const montoEnMonedaLocal = (tipoCambio * montoUSD).toFixed(2);

        try {
            // Enviar datos de la transacción a la API Flask
            const response = await axios.post('http://192.168.100.130:5002/transacciones', {
                numero_tarjeta: numeroTarjeta,
                monto: montoEnMonedaLocal,
            });

            if (response.status === 201) {
                setTransaccionExito(true);
                Alert.alert('Éxito', 'La transacción fue exitosa!');
            } else {
                Alert.alert('Error', 'Hubo un problema con la transacción.');
            }
        } catch (error) {
            console.error('Error realizando el pago', error);
            Alert.alert('Error', 'Ocurrió un error al procesar el pago.');
        }
    };

    useEffect(() => {
        obtenerTipoCambio();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Tipo de Cambio </Text>
            <Text style={styles.tipoCambio}>
            1 USD a Moneda Local: {tipoCambio === 1 ? '505.57' : tipoCambio}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Número de tarjeta"
                keyboardType="numeric"
                maxLength={16}
                value={numeroTarjeta}
                onChangeText={setNumeroTarjeta}
            />

            <TextInput
                style={styles.input}
                placeholder="Monto en USD"
                keyboardType="numeric"
                value={montoUSD}
                onChangeText={(text) => {
                    setMontoUSD(text);
                    setMontoLocal((tipoCambio * text).toFixed(2)); // Actualiza el monto en moneda local
                }}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={realizarPago}
            >
                <Text style={styles.buttonText}>Realizar Transacción</Text>
            </TouchableOpacity>

            {transaccionExito && (
                <Text style={styles.exito}>La transacción se realizó correctamente.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E9F9FB',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    tipoCambio: {
        fontSize: 18,
        marginBottom: 10,
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
    montoLocal: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0070ba',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    exito: {
        color: 'green',
        fontSize: 18,
        marginTop: 20,
    },
});

export default Transacciones;
