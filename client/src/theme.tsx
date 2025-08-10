import {createTheme} from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#287dae',
      light: '#3897c3'
    },
    secondary: {
      main: '#007c77'
    },
    // error: {
    //   main: '#ff0000'
    // },
    // success: {
    //   main: '#00ff00'
    // },
    text: {
      primary: '#E0E2DB'
    },
    // warning: {
    //   main: '#ffff00'
    // },
    background: {
      default: '#282633',
      paper: '#413F54'
    }
  },
  shape: {
    borderRadius: 5,
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;'
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small'
      }
    }
  }
})