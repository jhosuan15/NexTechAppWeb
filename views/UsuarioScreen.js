import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import CryptoJS from 'crypto-js';

const UsuarioScreen = ({ route, navigation }) => {
    const { onSave } = route.params || {};

    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [plazo, setPlazo] = useState('30'); // Valor inicial de 30 días
    const [preguntaSeguridad, setPreguntaSeguridad] = useState(''); // Campo para canción favorita
    const [showPlazoOptions, setShowPlazoOptions] = useState(false); // Mostrar/Ocultar opciones del ComboBox
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        specialChar: false,
    });

    const plazos = ['30', '60', '90'];

    const [pais, setPais] = useState(null);
    const [provincia, setProvincia] = useState(null);
    const [distrito, setDistrito] = useState(null);
    const [showPaisOptions, setShowPaisOptions] = useState(false);
    const [showProvinciaOptions, setShowProvinciaOptions] = useState(false);
    const [showDistritoOptions, setShowDistritoOptions] = useState(false);

    const paises = [
        { nombre: 'Costa Rica', habilitado: true },
        { nombre: 'Guatemala', habilitado: false },
        { nombre: 'El Salvador', habilitado: false },
        { nombre: 'Honduras', habilitado: false },
        { nombre: 'Nicaragua', habilitado: false },
        { nombre: 'Panamá', habilitado: false },
        { nombre: 'Belice', habilitado: false },
    ];

    const provincias = {
        'Costa Rica': ['San José', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limón'],
    };

    const distritos = {
        'San José': ['Carmen', 'Merced', 'Hospital', 'Catedral', 'Zapote'],
        'Alajuela': ['Alajuela', 'San José', 'Carrizal', 'San Antonio'],
        'Cartago': ['Cartago', 'Paraiso', 'La Unión', 'Oreamuno'],
        // Agregar los distritos de las demás provincias
    };

    const handlePasswordChange = (text) => {
        setContrasena(text);
        setPasswordRequirements({
            length: text.length >= 8 && text.length <= 12,
            uppercase: /[A-Z]/.test(text),
            lowercase: /[a-z]/.test(text),
            specialChar: /[!@#$%^&*]/.test(text),
        });
    };

    const handleSave = async () => {
        if (!usuario || !contrasena || !preguntaSeguridad) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }

        if (!Object.values(passwordRequirements).every(Boolean)) {
            Alert.alert('Error', 'La contraseña no cumple con los requisitos de seguridad.');
            return;
        }

        try {
            const secretKey = CryptoJS.enc.Utf8.parse('my_secret_key_32_bytes!'); // Asegúrate de que sea de 32 bytes
            const encryptedPassword = CryptoJS.AES.encrypt(contrasena, secretKey, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }).toString();

            const newUsuario = {
                usuario,
                contrasena: encryptedPassword,
                plazo,
                preguntaSeguridad, // Incluye la canción favorita en el payload
            };

            const response = await fetch('http://192.168.101.14:5003/api/usuarios/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUsuario),
            });

            const result = await response.json();
            if (response.ok) {
                Alert.alert('Éxito', 'Usuario guardado exitosamente.');
                navigation.goBack();
            } else {
                Alert.alert('Error', result.message || 'Hubo un problema al guardar el usuario.');
            }
            onSave(newUsuario);
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al encriptar la contraseña.');
        }
    };
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                placeholder="Usuario"
                value={usuario}
                onChangeText={setUsuario}
                style={styles.input}
            />
            <TextInput
                placeholder="Contraseña"
                value={contrasena}
                onChangeText={handlePasswordChange}
                style={styles.input}
                secureTextEntry
            />
            <View style={styles.passwordRequirements}>
                <Text style={passwordRequirements.length ? styles.valid : styles.invalid}>
                    {passwordRequirements.length ? '✔' : '✖'} Longitud entre 8 y 12 caracteres
                </Text>
                <Text style={passwordRequirements.uppercase ? styles.valid : styles.invalid}>
                    {passwordRequirements.uppercase ? '✔' : '✖'} Al menos una letra mayúscula
                </Text>
                <Text style={passwordRequirements.lowercase ? styles.valid : styles.invalid}>
                    {passwordRequirements.lowercase ? '✔' : '✖'} Al menos una letra minúscula
                </Text>
                <Text style={passwordRequirements.specialChar ? styles.valid : styles.invalid}>
                    {passwordRequirements.specialChar ? '✔' : '✖'} Al menos un carácter especial
                </Text>
            </View>
            <TextInput
                placeholder="Recuperación de contraseña: Canción favorita" // Campo para la canción favorita
                value={preguntaSeguridad}
                onChangeText={setPreguntaSeguridad}
                style={styles.input}
            />
            {/* ComboBox Simple */}
            <TouchableOpacity onPress={() => setShowPlazoOptions(!showPlazoOptions)} style={styles.comboBox}>
                <Text style={styles.comboBoxText}>Plazo: {plazo} días</Text>
            </TouchableOpacity>
            {showPlazoOptions && (
                <FlatList
                    data={plazos}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { setPlazo(item); setShowPlazoOptions(false); }} style={styles.comboBoxItem}>
                            <Text>{item} días</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.comboBoxList}
                />
            )}

            <TouchableOpacity onPress={() => setShowPaisOptions(!showPaisOptions)} style={styles.comboBox}>
                <Text style={styles.comboBoxText}>País: {pais || 'Selecciona un país'}</Text>
            </TouchableOpacity>
            {showPaisOptions && (
                <FlatList
                    data={paises}
                    keyExtractor={(item) => item.nombre}
                    renderItem={({ item }) => (
                        item.habilitado && (
                            <TouchableOpacity onPress={() => { setPais(item.nombre); setShowPaisOptions(false); setProvincia(null); setDistrito(null); }} style={styles.comboBoxItem}>
                                <Text>{item.nombre}</Text>
                            </TouchableOpacity>
                        )
                    )}
                    style={styles.comboBoxList}
                />
            )}

            {pais && (
                <>
                    <TouchableOpacity onPress={() => setShowProvinciaOptions(!showProvinciaOptions)} style={styles.comboBox}>
                        <Text style={styles.comboBoxText}>Provincia: {provincia || 'Selecciona una provincia'}</Text>
                    </TouchableOpacity>
                    {showProvinciaOptions && (
                        <FlatList
                            data={provincias[pais]}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { setProvincia(item); setShowProvinciaOptions(false); setDistrito(null); }} style={styles.comboBoxItem}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                            style={styles.comboBoxList}
                        />
                    )}
                </>
            )}

            {provincia && (
                <>
                    <TouchableOpacity onPress={() => setShowDistritoOptions(!showDistritoOptions)} style={styles.comboBox}>
                        <Text style={styles.comboBoxText}>Distrito: {distrito || 'Selecciona un distrito'}</Text>
                    </TouchableOpacity>
                    {showDistritoOptions && (
                        <FlatList
                            data={distritos[provincia]}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { setDistrito(item); setShowDistritoOptions(false); }} style={styles.comboBoxItem}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                            style={styles.comboBoxList}
                        />
                    )}
                </>
            )}

            <TouchableOpacity style={styles.buttonGuardar} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
        backgroundColor: '#fff',
    },
    passwordRequirements: {
        marginBottom: 20,
    },
    valid: {
        color: 'green',
    },
    invalid: {
        color: 'red',
    },
    comboBox: {
        borderWidth: 1,
        borderColor: '#105B63',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    comboBoxText: {
        fontSize: 16,
    },
    comboBoxList: {
        borderWidth: 1,
        borderColor: '#105B63',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
        maxHeight: 100,
    },
    comboBoxItem: {
        padding: 10,
    },
    buttonGuardar: {
        backgroundColor: '#105B63',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default UsuarioScreen;
