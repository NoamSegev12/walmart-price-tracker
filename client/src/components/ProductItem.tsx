import type {Product} from '../interfaces/Product';
import {Box, Typography, Button, Paper} from '@mui/material';
import ReactStars from 'react-rating-stars-component';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {Anchor} from '../styledComponents/Anchor.tsx';
import {DeleteOutline} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import type {ProductItemProps} from '../interfaces/ProductItemProps';
import {useAlert} from '../contexts/UseAlert';
import ProductPage from './ProductPage';
import {useState} from 'react';

const ProductItem = ({product, setProducts, isSearchDisplay}: ProductItemProps) => {
  const {showAlert} = useAlert();
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddToCart = async (product: Product) => {
    try {
      const response = await fetch(`/api/products/${encodeURIComponent(product.product_id)}`, {method: 'POST'});
      if (!response.ok) {
        const errorData = await response.json(); // Assuming Flask sends JSON errors
        console.error('Failed to fetch products:', errorData);
        showAlert('Failed to add product to cart. Please try again.', 'error');
        return;
      }
      setProducts((prevProducts: Product[]) => [...prevProducts, product]);
      showAlert('Product added to cart.', 'success');
    } catch (err) {
      console.error('Failed to delete product:', err);
      showAlert('Failed to add product to cart. Please try again.', 'error');
    }
  };

  const handleDeleteFromCart = async (product_id: string) => {
    try {
      const response = await fetch(`/api/products/${encodeURIComponent(product_id)}`, {method: 'DELETE'});
      if (!response.ok) {
        const errorData = await response.json(); // Assuming Flask sends JSON errors
        console.error('Failed to fetch products:', errorData);
        showAlert('Failed to delete product. Please try again.', 'error');
        return;
      }
      setProducts((prevProducts: Product[]) => prevProducts.filter((product: Product) => product.product_id !== product_id));
      showAlert('Product deleted from cart.', 'success');
    } catch (err) {
      console.error('Failed to delete product:', err);
      showAlert('Failed to delete product. Please try again.', 'error');
    }
  };

  return (
    <>
      <Paper sx={{padding: 2, height: '100%'}} onClick={() => setOpenDialog(true)}>
        <Box sx={{display: 'flex', justifyContent: 'center', width: '100%', height: '150px'}}>
          <img
            src={product.image_url}
            alt={'Product image'}
            style={{display: 'block', margin: '0 auto', maxWidth: '100%', maxHeight: '150px', height: 'auto'}}
          />
        </Box>
        <div>
          <Typography variant="h6">{product.title}</Typography>
          <Typography>Price: ${product.current_price}</Typography>
          <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
            <Typography>Rating:</Typography>
            <Box sx={{display: 'flex', alignItems: 'center', paddingTop: 1}}>
              <ReactStars
                count={5}
                value={product.rating}
                size={16}
                isHalf
                edit={false}
                emptyIcon={<StarBorderIcon fontSize="small"/>}
                halfIcon={<StarHalfIcon fontSize="small"/>}
                filledIcon={<StarIcon fontSize="small"/>}
                activeColor="#ffd700"
              />
            </Box>
          </Box>
          <Anchor href={product.product_url} target={'_blank'}>Walmart Link to {product.title}</Anchor>
          {isSearchDisplay ?
            <Button endIcon={<AddIcon/>} sx={{marginTop: 2}}
                    onClick={() => handleAddToCart(product)}>Add</Button> :
            <Button variant={'outlined'} endIcon={<DeleteOutline/>} sx={{marginTop: 2}}
                    onClick={() => handleDeleteFromCart(product.product_id)}>Delete</Button>
          }
        </div>
      </Paper>
      <ProductPage product={product} openDialog={openDialog} setOpenDialog={setOpenDialog}
                   handleAddToCart={handleAddToCart}
                   handleDeleteFromCart={handleDeleteFromCart} isSearchDisplay={isSearchDisplay}/>
    </>
  );
};

export default ProductItem;