import {Grid} from '@mui/material';
import type {Product} from '../interfaces/Product.ts';
import type {ProductPanelProps} from '../interfaces/ProductPanelProps';
import ProductItem from './ProductItem';

const ProductsPanel = ({products, setProducts, isSearchDisplay}: ProductPanelProps) => {
    return (
      <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} margin={5} paddingBottom={5}>
        {products.map((product: Product, index: number) => (
          <Grid key={index} size={{xs: 2, sm: 4, md: 3}}>
            <ProductItem product={product} setProducts={setProducts} isSearchDisplay={isSearchDisplay}/>
          </Grid>
        ))}
      </Grid>
    );
  }
;

export default ProductsPanel;