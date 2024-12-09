import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    FlatList, 
    StyleSheet, 
    Alert, 
    Linking, 
    KeyboardAvoidingView, 
    Platform 
} from 'react-native';

const ChatSupport = () => {
    const [messages, setMessages] = useState([
        { id: '1', text: '¡Hola! Soy Nexi el asistente virtual. ¿En qué puedo ayudarte?\n1. Problema de acceso\n2. Problema de pago\n3. Otro problema', from: 'bot' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isAgentOnline, setIsAgentOnline] = useState(false);

    useEffect(() => {
        checkAgentAvailability();
    }, []);

    const checkAgentAvailability = async () => {
        // Simular la disponibilidad del agente
        const agentAvailable = await checkAgentStatusFromAPI();
        setIsAgentOnline(agentAvailable);
    };

    const handleSendMessage = () => {
        if (inputText.trim() === '') return;

        const newMessage = { id: String(messages.length + 1), text: inputText, from: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Procesar la opción seleccionada
        processUserInput(inputText);

        setInputText('');
    };

    const processUserInput = (input) => {
        const option = input.trim();

        if (option === '1') {
            // Manejar problema de acceso
            sendMessageToWhatsApp('Tengo un problema de acceso.');
        } else if (option === '2') {
            // Manejar problema de pago
            sendMessageToWhatsApp('Tengo un problema de pago.');
        } else if (option === '3') {
            // Manejar otro problema
            sendMessageToWhatsApp('Tengo otro problema.');
        } else {
            const botResponse = { id: String(messages.length + 2), text: 'Opción no válida. Por favor selecciona 1, 2 o 3.', from: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        }
    };

    const sendMessageToWhatsApp = (message) => {
        const phoneNumber = '50688121531'; // Número de teléfono con código de país
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        Linking.openURL(whatsappUrl).catch(err => {
            Alert.alert('Error', 'No se pudo abrir WhatsApp');
        });

        const botResponse = { id: String(messages.length + 3), text: 'Te redirigiré a WhatsApp para que puedas enviar tu mensaje.', from: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
    };

    const renderMessage = ({ item }) => (
        <View style={[styles.message, item.from === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100} // Ajusta este valor según la altura de tu encabezado o diseño
        >
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                style={styles.chatList}
                contentContainerStyle={{ paddingBottom: 20 }} // Espacio en la parte inferior
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Escribe un mensaje..."
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    chatList: {
        flex: 1,
        padding: 10,
    },
    message: {
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        maxWidth: '80%',
    },
    userMessage: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },
    botMessage: {
        backgroundColor: '#E5E5EA',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#E5E5EA',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E5E5EA',
        borderRadius: 20,
        backgroundColor: '#FFF',
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginLeft: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default ChatSupport;
