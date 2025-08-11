import {createContext} from 'react';
import type {AlertContextValue} from '../interfaces/Alert';

export const AlertContext = createContext<AlertContextValue | undefined>(undefined);