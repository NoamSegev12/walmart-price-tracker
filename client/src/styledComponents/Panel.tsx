import {styled} from '@mui/material';
import {DRAWER_WIDTH} from '../constants/Drawer';

export const Panel = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
  open?: boolean;
}>(({theme, open}) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: open ? theme.transitions.easing.easeOut : theme.transitions.easing.sharp,
    duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.shortest,
  }),
  marginLeft: open ? DRAWER_WIDTH : 0
}));