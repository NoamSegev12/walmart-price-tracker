import SearchBar from './searchBar/SearchBar.tsx';
import {useState} from 'react';
import ProductsPanel from './productsPannel/ProductsPanel.tsx';

const App = () => {
  const [products, setProducts] = useState([]);

  return (
    <div className="App">
      <SearchBar setProducts={setProducts}/>
      <ProductsPanel products={products}/>
    </div>
  )
}

export default App
