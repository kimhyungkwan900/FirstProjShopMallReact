import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 💡 useNavigate 추가

import {
  fetchProductDetail,
  fetchRecommendedProducts,
} from '../../../api/user/product/productApi';

import ProductImageGallery from '../../../component/user/product/ProductImageGallery';
import RecommendedProducts from '../../../component/user/product/RecommendedProducts';
import ProductBadge from '../../../component/user/product/ProductBadge';
import AddToCartButton from '../../../component/user/product/AddToCartButton';
// 💡 기존에 있던 fetchProductReviews, ProductReviewList는 제거됨

const ProductDetailFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 💡 상품 리뷰 페이지로 이동하기 위해 useNavigate 사용

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const detail = await fetchProductDetail(id);
        setProduct(detail);

        const rec = await fetchRecommendedProducts(id);
        setRecommended(rec.content || []);
      } catch (error) {
        console.error('상품 상세 정보를 불러오는 중 오류 발생:', error);
      }
    };

    loadProduct();
  }, [id]);

  // 💡 리뷰 페이지 이동 핸들러
  const goToReviewPage = () => {
    navigate(`/products/${id}/reviews`);
  };

  if (!product) return <p>상품 정보를 불러오는 중입니다...</p>;

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <ProductBadge status={product.sellStatus} />
      <ProductImageGallery images={product.images || []} />

      <p className="my-2 text-gray-700">{product.description}</p>
      <p className="text-lg font-semibold">가격: {product.price.toLocaleString()}원</p>
      <p>브랜드: {product.brandName || '브랜드 없음'}</p>
      <p>카테고리: {product.categoryName || '카테고리 없음'}</p>

      <div className="my-4">
        <AddToCartButton productId={product.id} />
      </div>

      {/* 💡 리뷰 페이지 이동 버튼 추가 */}
      <button
        onClick={goToReviewPage}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        상품 리뷰
      </button>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">추천 상품</h3>
        <RecommendedProducts products={recommended} />
      </div>
    </div>
  );
};

export default ProductDetailFeature;
