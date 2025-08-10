import SearchBar from './searchBar/SearchBar.tsx';
import {useState} from 'react';
import ProductsPanel from './productsPannel/ProductsPanel.tsx';
import './index.css'
import type {Product} from './interfaces/product';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearchDisplay, setIsSearchDisplay] = useState(true);

  return (
    <div className="App">
      <SearchBar setProducts={setProducts} setIsSearchDisplay={setIsSearchDisplay}/>
      <ProductsPanel products={products} setProducts={setProducts} isSearchDisplay={isSearchDisplay}/>
    </div>
  )
}

export default App
