import React, { useEffect, useState } from 'react';
import { fetchPopularProducts } from '../../../api/user/product/productApi';
import ProductCard from './ProductCard';

// 인기 상품을 보여주는 컴포넌트 정의
const PopularProducts = () => {
  // 인기 상품 목록을 상태로 저장
  const [popularProducts, setPopularProducts] = useState([]);

  // 컴포넌트가 마운트될 때 인기 상품 데이터를 로드함
  useEffect(() => {
    const loadPopularProducts = async () => {
      try {
        // 백엔드에서 조회수 기준으로 인기 상품 8개 가져오기 (page: 0, size: 8)
        const data = await fetchPopularProducts(0, 8);
        // 받아온 data의 content 속성이 존재하면 상태에 저장
        setPopularProducts(data.content || []);
      } catch (error) {
        // API 호출 실패 시 콘솔에 에러 출력
        console.error('인기 상품 불러오기 실패:', error);
      }
    };

    // 데이터 로딩 함수 실행
    loadPopularProducts();
  }, []); // 빈 의존성 배열 = 컴포넌트 최초 렌더링 시 한 번 실행

  return (
    // 인기 상품 섹션 컨테이너
    <div className="popular-products my-8">
      {/* 반응형 그리드: 2~4열로 구성 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* 인기 상품 목록을 순회하며 ProductCard 컴포넌트로 렌더링 */}
        {popularProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
