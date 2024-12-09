import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoginLogsContext } from '../contexts/LoginContext'; // Asegúrate de tener el contexto

const Logs = () => {
  const { loginLogs } = useContext(LoginLogsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logs de Inicio de Sesión</Text>
      {loginLogs.map((log, index) => (
        <Text key={index} style={styles.logEntry}>
          {log.timestamp} - {log.username} - {log.success ? 'Éxito' : 'Fallo'}
        </Text>
      ))}
      {loginLogs.length === 0 && (
        <Text style={styles.noLogs}>No hay logs disponibles.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logEntry: {
    fontSize: 16,
    marginVertical: 5,
  },
  noLogs: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Logs;
