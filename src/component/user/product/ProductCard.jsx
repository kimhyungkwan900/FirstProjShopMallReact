import React from 'react';
import {
  formatPrice,
  truncateText,
  getMainImageUrl,
} from '../../../utils/user/product/formatters';
import ProductBadge from './ProductBadge';
import WishlistButton from './WishlistButton';

const ProductCard = ({ product }) => {
  const userId = 1; // 실제 로그인 사용자 ID로 교체 필요

  return (
    <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* 💖 위시리스트 버튼 - 우측 상단 */}
      <div className="absolute top-2 right-2 z-10">
        <WishlistButton productId={product.id} userId={userId} />
      </div>

      {/* ✅ 상세 페이지를 새 탭에서 열도록 <a href>로 변경 */}
      <a
        href={`/products/${product.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {/* 상품 이미지 */}
        <div className="relative">
          <img
            src={getMainImageUrl(product.images)}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />

          {/* 판매 상태 뱃지 */}
          <div className="absolute top-2 left-2">
            <ProductBadge status={product.sellStatus} />
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="p-4 space-y-1">
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition">
            {truncateText(product.name)}
          </h3>
          <p className="text-xs text-gray-500">{product.brandName}</p>
          <p className="text-blue-600 font-bold text-base">
            {formatPrice(product.price)}
          </p>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
