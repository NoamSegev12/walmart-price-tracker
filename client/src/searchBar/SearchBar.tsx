import {AppBar, Toolbar, Box} from '@mui/material';
import {Search, SearchIconWrapper, StyledSearchField} from '../styledComponents/Search.tsx';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/walmartIcon.png';
import {useState} from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const SearchBar = ({setProducts, setIsSearchDisplay}: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFromServer = async (url: string, method = {method: 'GET'}) => {
    setLoading(true);
    // setError(null);

    try {
      // Use the proxy configured in vite.config.js
      const response = await fetch(url, method);

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json(); // Assuming Flask sends JSON errors
        console.error('Failed to fetch products:', errorData);
        return;
      }

      const data = await response.json();
      console.log(data);
      setProducts(data); // Pass the results back to the parent component
    } catch (err) {
      console.error('Failed to fetch products:', err);
      // setError(`Failed to search: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMyShoppingCart = async () => {
    setIsSearchDisplay(false);
    await fetchFromServer('/api/products');
  };

  const handleSearch = async () => {
    console.log('searching');
    if (!searchTerm.trim()) {
      // setError('Please enter a search term.');
      return;
    }
    console.log(searchTerm);
    setIsSearchDisplay(true);
    await fetchFromServer(`/api/search/${encodeURIComponent(searchTerm)}`, {method: 'POST'});
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
              <SearchIconWrapper onClick={handleSearch}>
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