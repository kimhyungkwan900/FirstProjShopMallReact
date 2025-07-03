import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

import {
  fetchProductDetail,
  fetchRecommendedProducts,
} from '../../../api/user/product/productApi';

import ReviewButton from '../../../component/user/review/ReviewButton';
import ProductImageGallery from '../../../component/user/product/ProductImageGallery';
import RecommendedProducts from '../../../component/user/product/RecommendedProducts';
import ProductBadge from '../../../component/user/product/ProductBadge';

const ProductDetailFeature = () => {
  const { id } = useParams();

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

      {/* 💡 장바구니 추가 버튼(안지우) */}
      <div className="my-4">
        {/* <{장바구니 추가기능메서드명} productId={product.id} /> */}
      </div>

      {/* 💡 리뷰 페이지 이동 버튼(김건호) */}
      <div className="my-4">
        <ReviewButton productId={product.id}/>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">추천 상품</h3>
        <RecommendedProducts products={recommended} />
      </div>
    </div>
  );
};

export default ProductDetailFeature;
