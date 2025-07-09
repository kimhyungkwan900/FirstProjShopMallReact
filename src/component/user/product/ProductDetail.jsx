import React from 'react';
// 가격을 보기 좋게 포맷팅하는 유틸 함수 import
import { formatPrice } from '../utils/formatters';

// 상품 상세 정보를 보여주는 컴포넌트 정의
// - product: 상품 객체 (null 또는 undefined일 수 있음)
const ProductDetail = ({ product }) => {
  // 상품 데이터가 없을 경우 로딩 메시지 표시
  if (!product) return <div>상품 정보를 불러오는 중...</div>;

  return (
    // 상품 상세 정보 전체 컨테이너
    <div className="product-detail">
      {/* 상품 이름 */}
      <h2>{product.name}</h2>

      {/* 대표 이미지가 있으면 표시하고, 없으면 기본 이미지 표시 */}
      <img
        src={product.images?.find(img => img.repImg)?.imgUrl || '/images/default.jpg'}
        alt={product.name}
      />

      {/* 상품 설명 */}
      <p>{product.description}</p>

      {/* 가격 (formatPrice로 포맷팅하여 천 단위 쉼표 추가) */}
      <p>{formatPrice(product.price)}</p>

      {/* 재고 수량 */}
      <p>재고: {product.stock}</p>

      {/* 브랜드명 */}
      <p>브랜드: {product.brandName}</p>

      {/* 카테고리명 */}
      <p>카테고리: {product.categoryName}</p>
    </div>
  );
};

export default ProductDetail;
