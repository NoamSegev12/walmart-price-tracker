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
    text: {
      primary: '#E0E2DB'
    },
    background: {
      default: '#282633',
      paper: '#413F54'
    }
  },
  shape: {
    borderRadius: 5
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
    },
    MuiSlider: {
      defaultProps: {
        color: 'secondary',
        disableSwap: true,
        valueLabelDisplay: 'auto',
        sx: {
          '& .MuiSlider-markLabel': {
            color: '#E0E2DB'
          }
        }
      }
    }
  }
});