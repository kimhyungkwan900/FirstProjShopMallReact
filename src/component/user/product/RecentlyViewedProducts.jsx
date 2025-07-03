import React, { useEffect, useState } from 'react';
import { getRecentlyViewedProducts } from '../../../utils/localStorageUtil';
import ProductCard from './ProductCard';

const RecentlyViewedProducts = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const data = getRecentlyViewedProducts();
    setRecentProducts(data);
  }, []);

  if (recentProducts.length === 0) return null;

  return (
    <div className="recent-products mt-8">
      <h3 className="text-xl font-semibold mb-2">최근 본 상품</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {recentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedProducts;
