import React, { useEffect, useState } from 'react';
import { fetchPopularProducts } from '../../../api/user/product/productApi';
import ProductCard from './ProductCard';

const PopularProducts = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const loadPopularProducts = async () => {
      try {
        const data = await fetchPopularProducts(0, 8); // 상위 8개 상품 조회
        setPopularProducts(data.content || []);
      } catch (error) {
        console.error('인기 상품 불러오기 실패:', error);
      }
    };

    loadPopularProducts();
  }, []);

  return (
    <div className="popular-products my-8">
      <h2 className="text-2xl font-bold mb-4">🔥 인기 상품</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
