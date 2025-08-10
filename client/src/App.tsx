import SearchBar from './searchBar/SearchBar.tsx';
import {useState} from 'react';
import ProductsPanel from './productsPannel/ProductsPanel.tsx';
import './index.css'

const App = () => {
  const [products, setProducts] = useState([]);
  const [isSearchDisplay, setIsSearchDisplay] = useState(true);

  return (
    <div className="App">
      <SearchBar setProducts={setProducts} setIsSearchDisplay={setIsSearchDisplay}/>
      <ProductsPanel products={products} isSearchDisplay={isSearchDisplay}/>
    </div>
  )
}

export default App
