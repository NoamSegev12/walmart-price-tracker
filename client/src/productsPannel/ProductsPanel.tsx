import {Box, Button, Grid, Paper, Typography} from '@mui/material';
import type {Product} from '../interfaces/product.ts';
import {Anchor} from '../styledComponents/Anchor.tsx';
import AddIcon from '@mui/icons-material/Add';
import {DeleteOutline} from '@mui/icons-material';

const ProductsPanel = ({products, isSearchDisplay}: any) => {
  const handleAddToCart = () => {

  }

  const handleDeleteFromCart = () => {

  }

  return (
    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}} margin={5} paddingBottom={5}>
      {products.map((product: Product, index: number) => (
        <Grid key={index} size={{xs: 2, sm: 4, md: 3}}>
          <Paper sx={{padding: 2, height: '100%'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', width: '100%', height: '150px'}}>
              <img
                src={product.image_url}
                alt={'Product image'}
                style={{display: 'block', margin: '0 auto', maxWidth: '100%', maxHeight: '150px', height: 'auto'}}
              />
            </Box>
            <Box>
              <Typography variant="h6">{product.title}</Typography>
              <Typography>Price: ${product.current_price}</Typography>
              <Typography>Rating: {product.rating}</Typography>
              <Anchor href={product.product_url}>Walmart Link to {product.title}</Anchor>
              {isSearchDisplay ?
                <Button endIcon={<AddIcon/>} sx={{marginTop: 2}} onClick={handleAddToCart}>Add</Button> :
                <Button endIcon={<DeleteOutline/>} sx={{marginTop: 2}} onClick={handleDeleteFromCart}>Delete</Button>
              }
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsPanel;