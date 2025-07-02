import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchProductDetail,
  fetchRecommendedProducts,
  // fetchProductReviews,
} from '../../../api/user/product/productApi';
import ProductImageGallery from '../../../component/user/product/ProductImageGallery';
import RecommendedProducts from '../../../component/user/product/RecommendedProducts';
import ProductBadge from '../../../component/user/product/ProductBadge';
import AddToCartButton from '../../../component/user/product/AddToCartButton';
import ProductReviewList from '../../../component/user/review/ReviewContent';

const ProductDetailFeature = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const detail = await fetchProductDetail(id);
        setProduct(detail);

        const rec = await fetchRecommendedProducts(id);
        setRecommended(rec.content || []);

        const rev = await fetchProductReviews(id);
        setReviews(rev);
      } catch (error) {
        console.error('상품 상세 정보를 불러오는 중 오류 발생:', error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) return <p>상품 정보를 불러오는 중입니다...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <ProductBadge status={product.sellStatus} />
      <ProductImageGallery images={product.images} />
      <p>{product.description}</p>
      <p>가격: {product.price.toLocaleString()}원</p>
      <p>브랜드: {product.brandName}</p>
      <p>카테고리: {product.categoryName}</p>
      <AddToCartButton productId={product.id} />

      <h3>추천 상품</h3>
      <RecommendedProducts products={recommended} />

      <h3>상품 리뷰</h3>
      <ProductReviewList reviews={reviews} />
    </div>
  );
};

export default ProductDetailFeature;