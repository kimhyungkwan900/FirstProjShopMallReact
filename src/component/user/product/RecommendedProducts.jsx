import React from 'react';
import ProductCard from './ProductCard';

const RecommendedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="recommended-products mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        🛍️ 추천 상품
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
