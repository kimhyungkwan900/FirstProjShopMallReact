import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/user/product/ProductListPage';
import NotFoundPage from './pages/user/product/NotFoundPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductListPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* 옵션 */}
      </Routes>
    </Router>
  )
}

export default App;
