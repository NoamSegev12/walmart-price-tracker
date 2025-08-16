import {AppBar, Toolbar, Box, Tooltip} from '@mui/material';
import {FilterIconWrapper, Search, SearchIconWrapper, StyledSearchField} from '../styledComponents/Search.tsx';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../assets/walmartIcon.png';
import {useState} from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import FilterListIcon from '@mui/icons-material/FilterList';
import type {SearchBarProps} from '../interfaces/SearchBarProps';
import {useAlert} from '../contexts/UseAlert';

const SearchBar = ({setProducts, setIsSearchDisplay, loading, setLoading, openFilterBar, setOpenFilterBar}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {showAlert} = useAlert();

  const fetchFromServer = async (url: string, method = {method: 'GET'}) => {
    setLoading(true);
    let success;

    try {
      const response = await fetch(url, method);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch products:', errorData);
        showAlert('Failed to load products. Please try again.', 'error');
        return false;
      }

      const data = await response.json();
      setProducts(data);
      success = true;
    } catch (err) {
      console.error('Failed to fetch products:', err);
      showAlert('Failed to load products. Please try again.', 'error');
      success = false;
    } finally {
      setLoading(false);
    }
    return success;
  };

  const handleSearchedItems = async () => {
    const success = await fetchFromServer('/api/products');
    if (success)
      setIsSearchDisplay(true);
  };

  const handleMyShoppingCart = async () => {
    const success = await fetchFromServer('/api/cart');
    if (success)
      setIsSearchDisplay(false);
  };

  const handleSearch = async () => {
    const success = await fetchFromServer(`/api/search/${encodeURIComponent(searchTerm)}`, {method: 'POST'});
    if (success)
      setIsSearchDisplay(true);
  };

  return (
    <>
      <AppBar sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <a href={'https://www.walmart.com'} target={'_blank'} rel={'noreferrer'}>
            <img src={logo} alt={'Walmart logo'} width={40} height={40}/>
          </a>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <FilterIconWrapper onClick={() => setOpenFilterBar(!openFilterBar)} disabled={loading}>
              <FilterListIcon/>
            </FilterIconWrapper>
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
          <div>
            <Tooltip title={'Followed Items'}>
              <TurnedInNotIcon sx={{marginLeft: 2, cursor: 'pointer'}} onClick={handleSearchedItems}/>
            </Tooltip>
            <Tooltip title={'My Shopping Cart'}>
              <ShoppingCartIcon sx={{marginLeft: 2, cursor: 'pointer'}} onClick={handleMyShoppingCart}/>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </>
  );
};

export default SearchBar;