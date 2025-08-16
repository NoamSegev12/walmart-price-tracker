import type {ProductPageProps} from '../interfaces/ProductPageProps';
import {Typography, Button, DialogContent, Dialog, DialogActions, Box} from '@mui/material';
import ReactStars from 'react-rating-stars-component';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {Anchor} from '../styledComponents/Anchor.tsx';
import {DeleteOutline} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

const ProductPage = ({
                       product,
                       openDialog,
                       setOpenDialog,
                       handleAddToCart,
                       handleDeleteFromCart,
                       isSearchDisplay
                     }: ProductPageProps) => {
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
          <Typography>About this item:</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant={'text'} sx={{marginTop: 2}} onClick={() => setOpenDialog(false)}>Close</Button>
        {
          isSearchDisplay ? <Button endIcon={<AddIcon/>} sx={{marginTop: 2}}
                                    onClick={() => handleAddToCart(product)}>Add</Button> :
            <Button variant={'outlined'} endIcon={<DeleteOutline/>} sx={{marginTop: 2}}
                    onClick={() => handleDeleteFromDialog(product.product_id)}>Delete
            </Button>
        }
      </DialogActions>
    </Dialog>
  );
};

export default ProductPage;