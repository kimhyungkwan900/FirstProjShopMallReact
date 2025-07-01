import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductListPage from '../../../pages/user/product/ProductListPage'
import ProductDetailPage from '../../../pages/user/product/ProductDetailPage'
import WishlistPage from '../../../pages/user/product/WishlistPage';
import NotFoundPage from '../../../pages/user/product/NotFoundPage';

const ProductRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* 상품 목록 */}
        <Route path="/products" element={<ProductListPage />} />

        {/* 상품 상세 */}
        <Route path="/products/:id" element={<ProductDetailPage />} />

        {/* 찜한 상품 */}
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* 잘못된 경로 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default ProductRoutes;
