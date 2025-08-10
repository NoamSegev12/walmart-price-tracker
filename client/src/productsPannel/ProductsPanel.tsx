import {Box, Typography} from '@mui/material';
import type {Product} from '../interfaces/product.ts';

const ProductsPanel = ({products}: any) => {
  return (
    <div>
      {products.map((product: Product, index: number) => (
        <Box key={index}>
          <Typography variant="h6">{product.title}</Typography>
          <Typography>Price: ${product.currentPrice}</Typography>
          <Typography>Price: ${product.rating}</Typography>
          <Typography>Price: ${product.rating}</Typography>
          <img src={product.imageUrl} alt={"Product image"}/>
          <a href={product.productUrl}>{product.productUrl}</a>
        </Box>
      ))}
    </div>
  );
};

export default ProductsPanel;