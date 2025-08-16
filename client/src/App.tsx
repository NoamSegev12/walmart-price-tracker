import SearchBar from './components/SearchBar.tsx';
import {useMemo, useState} from 'react';
import ProductsPanel from './components/ProductsPanel.tsx';
import './index.css';
import type {Product} from './interfaces/Product';
import FilterBar from './components/FilterBar';
import {Box, Typography} from '@mui/material';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearchDisplay, setIsSearchDisplay] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openFilterBar, setOpenFilterBar] = useState(false);
  const [filters, setFilters] = useState<{priceRange: number[], ratingRange: number[]}>({
    priceRange: [0, 50],
    ratingRange: [0, 5]
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const inPrice =
        product.current_price >= filters.priceRange[0] &&
        product.current_price <= filters.priceRange[1];
      const inRating =
        product.rating >= filters.ratingRange[0] &&
        product.rating <= filters.ratingRange[1];
      return inPrice && inRating;
    });
  }, [products, filters]);

  return (
    <div className="App">
      <SearchBar setProducts={setProducts} setIsSearchDisplay={setIsSearchDisplay} loading={loading}
                 setLoading={setLoading} openFilterBar={openFilterBar} setOpenFilterBar={setOpenFilterBar}/>
      <FilterBar openFilterBar={openFilterBar} onApplyFilters={setFilters}/>
      {filteredProducts.length === 0 && !loading ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          minHeight: '70vh'
        }}>
          <Typography variant={'h2'}>Welcome to Walmart Price Tracker!</Typography>
          <Typography variant={'h5'}>Search for products to get started</Typography>
        </Box>
      ) : (
        <ProductsPanel
          products={filteredProducts}
          setProducts={setProducts}
          isSearchDisplay={isSearchDisplay}
          loading={loading}
          openFilterBar={openFilterBar}
        />
      )}
    </div>
  );
};

export default App;