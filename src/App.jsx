import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductRoutes from './router/user/product/ProductRoutes';

function App() {

  return (
    <Router>
      <ProductRoutes />
    </Router>
  )
}

export default App;
