import React from 'react';

const ProductBadge = ({ status }) => {
  const isSelling = status === '판매중';

  return (
    <span
      className={`absolute top-2 left-2 px-1.5 py-0.5 text-[10px] font-semibold rounded text-white shadow-sm
        ${isSelling ? 'bg-green-500' : 'bg-gray-400'}`}
    >
      {isSelling ? '판매중' : '품절'}
    </span>
  );
};

export default ProductBadge;
