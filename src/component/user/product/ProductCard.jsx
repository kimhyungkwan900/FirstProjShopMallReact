import React from 'react';
import { Link } from 'react-router-dom';
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

      <Link to={`/products/${product.id}`} className="block">
        {/* 상품 이미지 */}
        <div className="relative">
          <img
            src={getMainImageUrl(product.images)}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />

          {/* ✅ 판매 상태 뱃지 - 좌측 상단으로 이동 */}
          <div className="absolute top-2 left-2">
            <ProductBadge status={product.sellStatus} />
          </div>
        </div>

        {/* 상품 정보 영역 */}
        <div className="p-4 space-y-1">
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition">
            {truncateText(product.name)}
          </h3>
          <p className="text-xs text-gray-500">{product.brandName}</p>
          <p className="text-blue-600 font-bold text-base">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
