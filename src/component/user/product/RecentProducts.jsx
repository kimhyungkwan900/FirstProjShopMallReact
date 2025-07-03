// 예시: RecentProducts.jsx 컴포넌트
import React, { useEffect, useState } from 'react';
import { fetchRecentProducts } from '../../../api/user/product/productApi';
import ProductCard from './ProductCard';

const RecentProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchRecentProducts();
      setProducts(data.content || []);
    };
    load();
  }, []);

  return (
    <div className="recent-products">
      <h3 className="text-xl font-bold mb-4">🆕 최근 등록된 상품</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
