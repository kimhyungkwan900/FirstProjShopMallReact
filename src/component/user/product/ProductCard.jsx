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
    <div className="relative bg-white rounded-xl border border-gray-200 hover:shadow-xl transition duration-300 group overflow-hidden">
      {/* 💖 위시리스트 버튼 */}
      <div className="absolute top-2 right-2 z-10">
        <WishlistButton productId={product.id} userId={userId} />
      </div>

      {/* 상세 페이지 링크 */}
      <a
        href={`/products/${product.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {/* 상품 이미지 */}
        <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
          <img
            src={getMainImageUrl(product.images) || '/images/no-image.png'}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
          />
          {/* 판매 상태 뱃지 */}
          <div className="absolute top-2 left-2">
            <ProductBadge status={product.sellStatus} />
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition">
            {truncateText(product.name, 28)}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{product.brandName}</p>
          <p className="text-base font-bold text-blue-600">
            {formatPrice(product.price)}
          </p>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
