import React from 'react';
import {createBrowserRouter} from 'react-router-dom';

// 페이지 컴포넌트 임포트
import ProductListPage from '../../../pages/user/product/ProductListPage';
import ProductDetailPage from '../../../pages/user/product/ProductDetailPage';
import WishlistPage from '../../../pages/user/product/WishlistPage';
import NotFoundPage from '../../../pages/user/product/NotFoundPage';
import CategoryListPage from '../../../pages/user/product/CategoryListPage';
import BrandListPage from '../../../pages/user/product/BrandListPage';
import CategoryProductPage from '../../../pages/user/product/CategoryProductPage';
import BrandProductPage from '../../../pages/user/product/BrandProductPage';

// 라우터 정의
const productRouter = createBrowserRouter([
  {
    path: '/products',
    element: <ProductListPage />,
  },
  {
    path: '/products/:id',
    element: <ProductDetailPage />,
  },
  {
    path: '/wishlist',
    element: <WishlistPage />,
  },
  {
    path: '/categories',
    element: <CategoryListPage />,
  },
  {
    path: '/brands',
    element: <BrandListPage />,
  },
  {
    path: '/products/category/:categoryId',
    element: <CategoryProductPage />,
  },
  {
    path: '/products/brand/:brandId',
    element: <BrandProductPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default productRouter;
