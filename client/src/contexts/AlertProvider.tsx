import {type ReactNode, useState} from 'react';
import type {AlertData, AlertType} from '../interfaces/Alert';
import {Alert, Grow, type GrowProps, Snackbar} from '@mui/material';
import {AlertContext} from './AlertContext';

export const AlertProvider = ({children}: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertData | null>(null);

  const [open, setOpen] = useState(false);

  const showAlert = (message: string, severity: AlertType = 'info') => {
    setAlert({message, severity});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const GrowTransition = (props: GrowProps) => {
    return <Grow {...props} />;
  };

  return (
    <AlertContext.Provider value={{showAlert}}>
      {children}
      {alert && (
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          slots={{transition: GrowTransition}}
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        >
          <Alert
            severity={alert.severity}
            onClose={handleClose}
            sx={{boxShadow: 3}}
          >
            {alert.message}
          </Alert>
        </Snackbar>)}
    </AlertContext.Provider>
  );
};