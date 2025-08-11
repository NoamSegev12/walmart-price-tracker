import type {Product} from './Product';
import type {Dispatch, SetStateAction} from 'react';

export interface SearchBarProps {
  setProducts: Dispatch<SetStateAction<Product[]>>;
  setIsSearchDisplay: Dispatch<SetStateAction<boolean>>;
}