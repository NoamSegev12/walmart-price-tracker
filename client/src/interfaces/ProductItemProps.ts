import type {Product} from './Product';
import type {Dispatch, SetStateAction} from 'react';

export interface ProductItemProps {
  product: Product;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  isSearchDisplay: boolean;
}