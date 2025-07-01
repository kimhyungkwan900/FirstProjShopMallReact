import './App.css'
<<<<<<< HEAD
import ReviewButton from './component/user/review/ReviewButton'
import { RouterProvider } from 'react-router-dom'
import ReviewRouter from './router/review/ReviewRouter'
function App() {

  return (
    <>
      <ReviewButton productId={1}/>
      <RouterProvider router = {ReviewRouter}/>
    </>
=======
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
>>>>>>> main
  )
}

export default App;
