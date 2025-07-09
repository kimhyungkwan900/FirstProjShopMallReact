import React, { useEffect, useState } from 'react';
import { fetchRecentProducts } from '../../../api/user/product/productApi';
import ProductCard from './ProductCard';

// 최신 상품 목록을 보여주는 컴포넌트 정의
const RecentProducts = () => {
  // 최근 상품 목록을 저장할 상태 정의
  const [recentProducts, setRecentProducts] = useState([]);

  // 컴포넌트 마운트 시 API 호출하여 상품 데이터를 가져옴
  useEffect(() => {
    const loadRecentProducts = async () => {
      try {
        // 백엔드에서 최신 상품 8개를 조회
        const data = await fetchRecentProducts(0, 8);
        // 응답의 content가 있으면 상태에 저장, 없으면 빈 배열
        setRecentProducts(data.content || []);
      } catch (error) {
        // 오류 발생 시 콘솔에 메시지 출력
        console.error('최신 상품 불러오기 실패:', error);
      }
    };

    // 위에서 정의한 비동기 함수 호출
    loadRecentProducts();
  }, []);

  return (
    // 전체 섹션 컨테이너
    <div className="recent-products my-8">
      {/* 반응형 그리드: 2열 ~ 4열 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* 최근 상품 목록을 반복 렌더링하여 ProductCard로 표시 */}
        {recentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
