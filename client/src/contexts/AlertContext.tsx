import {createContext, type ReactNode, useContext, useState} from 'react';
import type {AlertContextValue, AlertData, AlertType} from '../interfaces/Alert';
import {Alert, Snackbar} from '@mui/material';

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  const showAlert = (message: string, severity: AlertType = "info") => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message, severity }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 3000); // 3 seconds
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {alerts.map((alert, index) => (
        <Snackbar
          key={alert.id}
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          sx={{ mb: `${index * 60}px` }} // stack alerts
        >
          <Alert severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
};