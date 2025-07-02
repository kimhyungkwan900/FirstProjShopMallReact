import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 기본 페이지
import ProductListPage from '../../../pages/user/product/ProductListPage';
import ProductDetailPage from '../../../pages/user/product/ProductDetailPage';
import WishlistPage from '../../../pages/user/product/WishlistPage';
import NotFoundPage from '../../../pages/user/product/NotFoundPage';

// 전용 목록 페이지
import CategoryListPage from '../../../pages/user/product/CategoryListPage';
import BrandListPage from '../../../pages/user/product/BrandListPage';
import CategoryProductPage from '../../../pages/user/product/CategoryProductPage';
import BrandProductPage from '../../../pages/user/product/BrandProductPage';

const ProductRoutes = () => {
  return (
      <Routes>
        {/* 전체 상품 목록 */}
        <Route path="/products" element={<ProductListPage />} />

        {/* 상품 상세 페이지 */}
        <Route path="/products/:id" element={<ProductDetailPage />} />

        {/* 찜한 상품 */}
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* 전체 카테고리 목록 페이지 */}
        <Route path="/categories" element={<CategoryListPage />} />

        {/* 전체 브랜드 목록 페이지 */}
        <Route path="/brands" element={<BrandListPage />} />

        {/* 특정 카테고리의 상품 목록 */}
        <Route path="/products/category/:categoryId" element={<CategoryProductPage />} />

        {/* 특정 브랜드의 상품 목록 */}
        <Route path="/products/brand/:brandId" element={<BrandProductPage />} />

        {/* 잘못된 경로 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
};

export default ProductRoutes;
