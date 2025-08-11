import {alpha, styled, TextField} from '@mui/material';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.light, 0.8),
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export const SearchIconWrapper = styled('button')(({ theme }) => ({
  padding: theme.spacing(0, 1, 0, 0),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  top: 0,
  backgroundColor: 'transparent',
  border: 'none',
  color: theme.palette.text.primary,
  '&:not(:disabled)': {
    cursor: 'pointer'
  }
}));

export const StyledSearchField = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    paddingRight: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  width: '400px',
  borderRadius: theme.shape.borderRadius,
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));