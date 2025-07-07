import React from 'react';
import ProductCard from './ProductCard';

const RecommendedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;

  const displayedProducts = products.slice(0, 3);

  return (
    <div className="recommended-products mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        🛍️ 추천 브랜드 상품
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
