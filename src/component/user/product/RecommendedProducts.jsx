import React from 'react';
import ProductCard from './ProductCard';

// 추천 상품 목록을 보여주는 컴포넌트
// - products: 추천 상품 배열
const RecommendedProducts = ({ products }) => {
  // 상품이 없거나 비어 있을 경우 아무것도 렌더링하지 않음
  if (!products || products.length === 0) return null;

  // 최대 3개까지만 추천 상품을 보여주도록 잘라냄
  const displayedProducts = products.slice(0, 3);

  return (
    // 추천 상품 섹션 컨테이너
    <div className="recommended-products mt-8">
      {/* 추천 상품 섹션 제목 */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        🛍️ 추천 브랜드 상품
      </h3>

      {/* 반응형 그리드 레이아웃: 2~3열로 구성 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
        {/* 잘라낸 상품 목록을 ProductCard로 반복 렌더링 */}
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
