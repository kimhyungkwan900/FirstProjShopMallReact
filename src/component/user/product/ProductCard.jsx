import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, truncateText, getMainImageUrl } from '../../../utils/user/product/formatters';
import ProductBadge from './ProductBadge';

const ProductCard = ({ product }) => {
  const userId=;//userId 받아오기

  return (
    <div className="product-card relative border rounded shadow-sm p-2">
      {/* 💖 위시리스트 버튼 - 이미지 우측 상단 */}
      <div className="absolute top-2 right-2 z-10">
        <WishlistButton productId={product.id} userId={userId} />
      </div>

      <Link to={`/products/${product.id}`}>
        <img
          src={getMainImageUrl(product.images)}
          alt={product.name}
          className="product-image w-full h-48 object-cover rounded"
        />

        <ProductBadge status={product.sellStatus} />

        <div className="product-info mt-2 px-1">
          <h3 className="product-title text-sm font-semibold">{truncateText(product.name)}</h3>
          <p className="product-brand text-gray-500 text-xs">{product.brandName}</p>
          <p className="product-price text-blue-600 font-bold">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;