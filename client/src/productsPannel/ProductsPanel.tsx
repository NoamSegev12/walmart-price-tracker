import {Box, Button, Grid, Paper, Typography} from '@mui/material';
import type {Product} from '../interfaces/product.ts';
import {Anchor} from '../styledComponents/Anchor.tsx';
import AddIcon from '@mui/icons-material/Add';
import {DeleteOutline} from '@mui/icons-material';
import ReactStars from 'react-rating-stars-component';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ProductsPanel = ({products, setProducts, isSearchDisplay}: any) => {
    const handleAddToCart = async (product: Product) => {
      try {
        const response = await fetch(`/api/products/${encodeURIComponent(product.product_id)}`, {method: 'POST'});
        if (!response.ok) {
          const errorData = await response.json(); // Assuming Flask sends JSON errors
          console.error('Failed to fetch products:', errorData);
          return;
        }
        setProducts((prevProducts: Product[]) => [...prevProducts, product]);
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    };

    const handleDeleteFromCart = async (product_id: string) => {
      try {
        const response = await fetch(`/api/products/${encodeURIComponent(product_id)}`, {method: 'DELETE'});
        if (!response.ok) {
          const errorData = await response.json(); // Assuming Flask sends JSON errors
          console.error('Failed to fetch products:', errorData);
          return;
        }
        setProducts((prevProducts: Product[]) => prevProducts.filter((product: Product) => product.product_id !== product_id));
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    };

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
                <Typography>Rating:</Typography>
                <ReactStars
                  count={5}
                  value={product.rating}
                  size={24}
                  isHalf
                  edit={false}
                  emptyIcon={<StarBorderIcon/>}
                  halfIcon={<StarHalfIcon/>}
                  filledIcon={<StarIcon/>}
                  activeColor="#ffd700"
                />
                <Anchor href={product.product_url}>Walmart Link to {product.title}</Anchor>
                {isSearchDisplay ?
                  <Button endIcon={<AddIcon/>} sx={{marginTop: 2}}
                          onClick={() => handleAddToCart(product)}>Add</Button> :
                  <Button variant={'outlined'} endIcon={<DeleteOutline/>} sx={{marginTop: 2}}
                          onClick={() => handleDeleteFromCart(product.product_id)}>Delete</Button>
                }
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }
;

export default ProductsPanel;