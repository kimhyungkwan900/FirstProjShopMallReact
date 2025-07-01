import React from 'react';
import ProductCard from './ProductCard';

const RecommendedProducts = ({ products }) => {
  return (
    <div className="recommended-products">
      <h3>추천 상품</h3>
      <div className="product-grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;