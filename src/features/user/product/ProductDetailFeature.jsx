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
import MainHeader from '../../common/Header/MainHeader';
import { saveRecentlyViewedProduct } from '../../../utils/user/product/localStorageUtil';
import StickyRecentlyViewedProducts from '../../../component/user/product/StickyRecentlyViewedProducts';
import CartButton from '../../../component/user/cart/CartButton';

const ProductDetailFeature = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const detail = await fetchProductDetail(id);
        setProduct(detail);

        // ✅ 최근 본 상품 저장
        saveRecentlyViewedProduct(detail);

        // 추천 상품 불러오기
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
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* 헤더 */}
      <MainHeader />

      <StickyRecentlyViewedProducts />
      {/* 메인 컨텐츠 */}
      <main className="flex-grow max-w-screen-lg mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow p-6 relative">
          {/* 상품 상태 뱃지 */}
          <div className="absolute top-6 right-9 z-10">
            <ProductBadge status={product.sellStatus} />
          </div>

          {/* 상품 이미지 + 정보 */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <ProductImageGallery images={product.images?.filter(img => img.repImg) || []} />
            </div>

            <div className="md:w-1/2 flex flex-col gap-4">
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <p className="text-2xl font-semibold text-blue-600">
                {product.price.toLocaleString()}원
              </p>
              <p className="text-gray-600">브랜드: {product.brandName || '브랜드 없음'}</p>
              <p className="text-gray-600">카테고리: {product.categoryName || '카테고리 없음'}</p>

            {/* 장바구니 버튼 자리 */}
            <div className="my-4">
              <CartButton productId={product.id} />
            </div>

              {/* 리뷰 작성 */}
              <div>
                <ReviewButton productId={product.id} />
              </div>
            </div>
          </div>

          {/* 상품 설명 */}
          <div className="mt-10 border-t pt-6 text-gray-700 leading-relaxed text-base">
            {product.description}
          </div>
        </div>

        {/* 추가 이미지 */}
        {product.images && product.images.filter(img => !img.repImg).length > 0 && (
          <section className="mt-12">
            <h3 className="text-xl font-semibold mb-4">📸 추가 이미지</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {product.images
                .filter(img => !img.repImg)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img.imgUrl}
                    alt={`추가 이미지 ${index + 1}`}
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                ))}
            </div>
          </section>
        )}

        {/* 추천 상품 */}
        <section className="mt-16">
          <h3 className="text-2xl font-semibold mb-4">✨ 함께 보면 좋은 상품</h3>
          <RecommendedProducts products={recommended} />
        </section>

      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default ProductDetailFeature;
