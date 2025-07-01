import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailFeature from '../../../features/user/product/ProductDetailFeature';

const ProductDetailPage = () => {
  const { productId } = useParams();
  return <ProductDetailFeature productId={productId} />;
};

export default ProductDetailPage;