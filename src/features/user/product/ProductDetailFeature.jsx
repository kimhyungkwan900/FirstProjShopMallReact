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
import Footer from '../../../component/common/Footer';

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

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-gray-500 text-lg">
        상품 정보를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 상품 이미지 갤러리 */}
          <div className="md:w-1/2">
            <ProductImageGallery images={product.images || []} />
          </div>

          {/* 상품 정보 */}
          <div className="md:w-1/2 flex flex-col gap-3">
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <ProductBadge status={product.sellStatus} />
            <p className="text-2xl font-semibold text-blue-600">
              {product.price.toLocaleString()}원
            </p>
            <p className="text-gray-600">브랜드: {product.brandName || '브랜드 없음'}</p>
            <p className="text-gray-600">카테고리: {product.categoryName || '카테고리 없음'}</p>

            {/* 장바구니 버튼 자리 */}
            <div className="my-4">
              {/* <AddToCartButton productId={product.id} /> */}
            </div>

            {/* 리뷰 버튼 */}
            <div className="my-2">
              <ReviewButton productId={product.id} />
            </div>
          </div>
        </div>

        {/* 상품 설명 */}
        <div className="mt-8 border-t pt-6 text-gray-700 leading-relaxed text-[1rem]">
          {product.description}
        </div>
      </div>

      {product.images && product.images.filter(img => !img.repImg).length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">📸 추가 이미지</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {product.images
              .filter(img => !img.repImg)
              .map((img, index) => (
                <img
                  key={index}
                  src={img.imgUrl}
                  alt={`추가 이미지 ${index + 1}`}
                  className="w-full h-auto rounded-md shadow"
                />
              ))}
          </div>
        </div>
      )}

      {/* 추천 상품 */}
      <div className="mt-12 mb-20">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">✨ 함께 보면 좋은 상품</h3>
        <RecommendedProducts products={recommended} />
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailFeature;
