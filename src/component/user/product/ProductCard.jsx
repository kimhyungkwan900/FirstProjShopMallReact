import React, { useContext } from 'react';
import {
  formatPrice,
  truncateText,
  getMainImageUrl,
} from '../../../utils/user/product/formatters';
// 상품 상태 뱃지 컴포넌트 import
import ProductBadge from './ProductBadge';
// 위시리스트 버튼 컴포넌트 import
import WishlistButton from './WishlistButton';
// 로그인 사용자 정보를 불러오기 위한 Context import
import { UserContext } from '../../common/Context/UserContext';

// 상품 정보를 렌더링하는 카드 컴포넌트
const ProductCard = ({ product }) => {
  // UserContext에서 로그인한 사용자 정보 가져오기
  const { user } = useContext(UserContext);

  // 로그인된 사용자 ID 추출 (null일 수도 있음)
  const userId = user?.id;

  return (
    // 카드 전체 컨테이너
    <div className="relative bg-white rounded-xl border border-gray-200 hover:shadow-xl transition duration-300 group overflow-hidden">
      
      {/* 💖 위시리스트 버튼 (오른쪽 상단에 위치) */}
      <div className="absolute top-2 right-2 z-10">
        <WishlistButton productId={product.id} userId={userId} />
      </div>

      {/* 상품 상세 페이지 링크로 감싼 영역 */}
      <a
        href={`/products/${product.id}`}                      // 상세페이지 URL
        target="_blank"                                       // 새 탭에서 열기
        rel="noopener noreferrer"                            // 보안 설정
        className="block"
      >
        {/* 상품 이미지 영역 */}
        <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
          <img
            src={getMainImageUrl(product.images) || '/images/no-image.png'} // 대표 이미지 URL 또는 기본 이미지
            alt={product.name} // 접근성 및 대체 텍스트
            className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300" // 마우스 hover 시 확대 효과
          />
          
          {/* 상품 상태 뱃지 (판매중/품절) */}
          <div className="absolute top-2 left-2">
            <ProductBadge status={product.sellStatus} />
          </div>
        </div>

        {/* 상품 텍스트 정보 영역 */}
        <div className="p-4">
          {/* 상품명 */}
          <h3 className="text-sm font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition">
            {truncateText(product.name, 28)} {/* 너무 긴 이름은 잘라서 표시 */}
          </h3>

          {/* 브랜드명 */}
          <p className="text-xs text-gray-500 mb-2">
            {product.brandName}
          </p>

          {/* 가격 */}
          <p className="text-base font-bold text-blue-600">
            {formatPrice(product.price)} {/* 숫자에 천 단위 쉼표 추가 */}
          </p>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
