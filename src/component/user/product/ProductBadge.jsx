import React from 'react';

// ProductBadge 컴포넌트 정의
// props:
// - status: 상품의 판매 상태 ('판매중' 또는 '품절')
const ProductBadge = ({ status }) => {
  // status가 '판매중'이면 true, 아니면 false
  const isSelling = status === '판매중';

  return (
    // 상품 카드 위에 표시되는 상태 뱃지(span)
    <span
      className={`absolute top-2 left-2 px-1.5 py-0.5 text-[10px] font-semibold rounded text-white shadow-sm
        ${isSelling ? 'bg-green-500' : 'bg-gray-400'}`} // 상태에 따라 배경색 결정
    >
      {/* 상태에 따라 텍스트 표시 */}
      {isSelling ? '판매중' : '품절'}
    </span>
  );
};

export default ProductBadge;
