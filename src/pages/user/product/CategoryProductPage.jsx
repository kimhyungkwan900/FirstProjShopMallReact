import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilteredProductListFeature from '../../../features/user/product/FilteredProductListFeature';
import { fetchAllCategories } from '../../../api/user/product/categoryApi';

import Footer from '../../../component/common/Footer';
import MainHeader from '../../../features/common/Header/MainHeader';

// 카테고리 상품 목록 페이지 컴포넌트 정의
const CategoryProductPage = () => {
  const { categoryId } = useParams();         // URL에서 categoryId 추출
  const [categoryName, setCategoryName] = useState(''); // 카테고리 이름 상태

  // 카테고리 이름을 로드하는 비동기 작업
  useEffect(() => {
    const loadCategoryName = async () => {
      try {
        const categories = await fetchAllCategories(); // 전체 카테고리 목록 조회
        const category = categories.find((c) => String(c.id) === String(categoryId)); // 현재 ID와 일치하는 카테고리 찾기

        if (category) {
          setCategoryName(category.name); // 찾았으면 이름 설정
        } else {
          setCategoryName('알 수 없는 카테고리'); // 못 찾았을 경우
        }
      } catch (error) {
        console.error('카테고리 정보 조회 실패:', error);
        setCategoryName('카테고리 로딩 실패'); // 예외 발생 시
      }
    };

    loadCategoryName(); // 실행
  }, [categoryId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* 상단 공통 헤더 */}
      <MainHeader />

      {/* 본문 콘텐츠 영역 */}
      <main className="flex-grow max-w-screen-xl mx-auto px-4 py-10">
        {/* 타이틀 + 설명 */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800">
            {categoryName ? `"${categoryName}" 카테고리 상품` : '카테고리 상품'}
          </h2>
          <p className="text-gray-500 mt-2">
            {categoryName === '카테고리 로딩 실패'
              ? '카테고리 정보를 불러오는 데 실패했습니다.'
              : categoryName === '알 수 없는 카테고리'
              ? '존재하지 않는 카테고리입니다.'
              : '해당 카테고리의 다양한 상품을 확인해보세요!'}
          </p>
        </div>

        {/* 상품 목록 필터 + 리스트 출력 */}
        <FilteredProductListFeature filterType="category" />
      </main>

      {/* 공통 푸터 */}
      <Footer />
    </div>
  );
};

// 외부에서 사용할 수 있도록 export
export default CategoryProductPage;
