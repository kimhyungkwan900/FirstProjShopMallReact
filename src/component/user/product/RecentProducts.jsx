import React, { useEffect, useState } from 'react';
import { fetchRecentProducts } from '../../../api/user/product/productApi';
import ProductCard from './ProductCard';

const RecentProducts = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const loadRecentProducts = async () => {
      try {
        const data = await fetchRecentProducts(0, 8); // 최신 상품 8개
        setRecentProducts(data.content || []);
      } catch (error) {
        console.error('최신 상품 불러오기 실패:', error);
      }
    };

    loadRecentProducts();
  }, []);

  return (
    <div className="recent-products my-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
