import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilteredProductListFeature from '../../../features/user/product/FilteredProductListFeature';
import { fetchAllBrands } from '../../../api/user/product/brandApi';

import Footer from '../../../component/common/Footer';
import MainHeader from '../../../features/common/Header/MainHeader';

// 특정 브랜드에 속한 상품 목록을 보여주는 페이지 컴포넌트
const BrandProductPage = () => {
  const { brandId } = useParams(); // URL에서 brandId 추출
  const [brandName, setBrandName] = useState(''); // 브랜드명 상태 관리

  // 브랜드 ID에 따른 브랜드 이름 불러오기
  useEffect(() => {
    const loadBrandName = async () => {
      try {
        const brands = await fetchAllBrands(); // 전체 브랜드 목록 불러오기
        const brand = brands.find((b) => String(b.id) === String(brandId)); // ID 일치 브랜드 찾기

        if (brand) {
          setBrandName(brand.name); // 이름 설정
        } else {
          setBrandName('알 수 없는 브랜드'); // 존재하지 않는 경우
        }
      } catch (error) {
        console.error('브랜드 이름 조회 실패:', error);
        setBrandName('브랜드 로딩 실패'); // 에러 시 처리
      }
    };

    loadBrandName();
  }, [brandId]); // brandId가 변경될 때마다 실행

  return (
    // 전체 페이지 배경 및 최소 높이 설정
    <div className="w-full bg-gray-50 min-h-screen">
      {/* 공통 헤더 */}
      <MainHeader />

      {/* 본문: 가운데 정렬된 제한 너비 */}
      <main className="max-w-screen-xl mx-auto px-4 py-10">
        {/* 페이지 타이틀과 설명 */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800">
            🏷️ {brandName ? `"${brandName}" 브랜드 상품` : '브랜드 상품 목록'}
          </h2>
          <p className="text-gray-500 mt-2">
            {brandName === '브랜드 로딩 실패'
              ? '브랜드 정보를 불러오는 데 실패했습니다.'
              : brandName === '알 수 없는 브랜드'
              ? '존재하지 않는 브랜드입니다.'
              : '해당 브랜드의 다양한 상품을 만나보세요!'}
          </p>
        </div>

        {/* 필터링된 브랜드 상품 리스트 렌더링 */}
        <FilteredProductListFeature filterType="brand" />
      </main>

      {/* 공통 푸터 */}
      <Footer />
    </div>
  );
};

export default BrandProductPage;
