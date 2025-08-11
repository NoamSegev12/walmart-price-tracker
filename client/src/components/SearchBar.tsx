import {AppBar, Toolbar, Box} from '@mui/material';
import {Search, SearchIconWrapper, StyledSearchField} from '../styledComponents/Search.tsx';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/walmartIcon.png';
import {useState} from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type {SearchBarProps} from '../interfaces/SearchBarProps';
import {useAlert} from '../contexts/UseAlert';

const SearchBar = ({setProducts, setIsSearchDisplay}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const {showAlert} = useAlert();

  const fetchFromServer = async (url: string, method = {method: 'GET'}) => {
    setLoading(true);

    try {
      const response = await fetch(url, method);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch products:', errorData);
        showAlert('Failed to load products. Please try again.', 'error');
        return;
      }

      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      showAlert('Failed to load products. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleMyShoppingCart = async () => {
    await fetchFromServer('/api/products');
    setIsSearchDisplay(false);
  };

  const handleSearch = async () => {
    await fetchFromServer(`/api/search/${encodeURIComponent(searchTerm)}`, {method: 'POST'});
    setIsSearchDisplay(true);
  };

  return (
    <>
      <AppBar>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <img src={logo} alt={'Walmart logo'} width={40} height={40}/>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Search>
              <StyledSearchField
                placeholder={'Search...'}
                disabled={loading}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <SearchIconWrapper onClick={handleSearch} disabled={!searchTerm || loading}>
                <SearchIcon/>
              </SearchIconWrapper>
            </Search>
          </Box>
          <ShoppingCartIcon sx={{marginLeft: 2, cursor: 'pointer'}} onClick={handleMyShoppingCart}/>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </>
  );
};

export default SearchBar;