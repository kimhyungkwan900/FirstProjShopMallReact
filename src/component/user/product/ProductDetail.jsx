import React from 'react';
import { formatPrice } from '../utils/formatters';

const ProductDetail = ({ product }) => {
  if (!product) return <div>상품 정보를 불러오는 중...</div>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img
      src={product.images?.find(img => img.repImg)?.imgUrl || '/images/default.jpg'}
      alt={product.name}
      />
      <p>{product.description}</p>
      <p>{formatPrice(product.price)}</p>
      <p>재고: {product.stock}</p>
      <p>브랜드: {product.brandName}</p>
      <p>카테고리: {product.categoryName}</p>
    </div>
  );
};

export default ProductDetail;