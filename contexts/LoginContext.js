import React, { createContext, useState, useContext } from 'react';

const LoginLogContext = createContext();

export const LoginLogProvider = ({ children }) => {
  const [loginLogs, setLoginLogs] = useState([]);

  const logAttempt = (username, success) => {
    const logEntry = {
      username,
      success,
      timestamp: new Date().toLocaleString(),
    };
    setLoginLogs(prevLogs => [...prevLogs, logEntry]);
    console.log(logEntry); // Muestra el log en la consola
  };

  return (
    <LoginLogContext.Provider value={{ loginLogs, logAttempt }}>
      {children}
    </LoginLogContext.Provider>
  );
};

export const useLoginLog = () => {
  return useContext(LoginLogContext);
};
