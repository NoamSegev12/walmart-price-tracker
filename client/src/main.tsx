import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {theme} from './theme.tsx';
import {AlertProvider} from './contexts/AlertContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <CssBaseline/>
        <App/>
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>
);