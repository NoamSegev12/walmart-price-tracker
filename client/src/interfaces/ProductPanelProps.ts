import type {Product} from './Product';
import type {Dispatch, SetStateAction} from 'react';

export interface ProductPanelProps {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  isSearchDisplay: boolean;
  loading: boolean;
}