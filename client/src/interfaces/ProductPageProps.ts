import type {Product} from './Product';
import type {Dispatch, SetStateAction} from 'react';

export interface ProductPageProps {
  product: Product;
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  handleAddToCart: (product: Product) => Promise<void>;
  handleDeleteFromCart: (product_id: string) => Promise<void>;
  isSearchDisplay: boolean;
}