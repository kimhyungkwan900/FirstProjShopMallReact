import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, truncateText, getMainImageUrl } from '../../../utils/user/product/formatters';
import ProductBadge from './ProductBadge';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          src={getMainImageUrl(product.images)}
          alt={product.name}
          className="product-image"
        />
        <ProductBadge status={product.sellStatus} />
        <div className="product-info">
          <h3 className="product-title">{truncateText(product.name)}</h3>
          <p className="product-brand">{product.brandName}</p>
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;