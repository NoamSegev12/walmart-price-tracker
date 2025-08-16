import type {ProductPageProps} from '../interfaces/ProductPageProps';
import {Typography, Button, DialogContent, Dialog, DialogActions, Box} from '@mui/material';
import ReactStars from 'react-rating-stars-component';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {Anchor} from '../styledComponents/Anchor.tsx';
import {DeleteOutline} from '@mui/icons-material';
import type {Product} from '../interfaces/Product';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductPage = ({
                       product,
                       openDialog,
                       setOpenDialog,
                       handleAddToCart,
                       handleDeleteFromCart,
                       isSearchDisplay
                     }: ProductPageProps) => {
  const handleAddFromDialog = async (product: Product) => {
    await handleAddToCart(product);
    setOpenDialog(false);
  }
  const handleDeleteFromDialog = async (product_id: string) => {
    await handleDeleteFromCart(product_id, 'cart');
    setOpenDialog(false);
  }
  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
      <DialogContent sx={{display: 'flex', justifyContent: 'space-around'}}>
        <img
          src={product.image_url}
          alt={'Product image'}
          style={{maxWidth: '100%', maxHeight: '200px'}}
        />
        <Box sx={{margin: 2}}>
          <Typography fontWeight={'bold'}>{product.title}</Typography>
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant={'text'} sx={{marginTop: 2}} onClick={() => setOpenDialog(false)}>Close</Button>
        {
          isSearchDisplay ? <Button endIcon={<ShoppingCartIcon/>} sx={{marginTop: 2}}
                                    onClick={() => handleAddFromDialog(product)}>Add</Button> :
            <Button variant={'outlined'} endIcon={<DeleteOutline/>} sx={{marginTop: 2}}
                    onClick={() => handleDeleteFromDialog(product.product_id)}>Delete
            </Button>
        }
      </DialogActions>
    </Dialog>
  );
};

export default ProductPage;