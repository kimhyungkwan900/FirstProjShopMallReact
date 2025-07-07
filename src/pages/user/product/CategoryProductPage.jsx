import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilteredProductListFeature from '../../../features/user/product/FilteredProductListFeature';
import { fetchAllCategories } from '../../../api/user/product/categoryApi';
import Footer from '../../../component/common/Footer';
import MainHeader from '../../../features/common/Header/MainHeader';


const CategoryProductPage = () => {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const loadCategoryName = async () => {
      try {
        const categories = await fetchAllCategories();
        const category = categories.find((c) => String(c.id) === String(categoryId));
        if (category) {
          setCategoryName(category.name);
        } else {
          setCategoryName('알 수 없는 카테고리');
        }
      } catch (error) {
        console.error('카테고리 정보 조회 실패:', error);
        setCategoryName('카테고리 로딩 실패');
      }
    };

    loadCategoryName();
  }, [categoryId]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <MainHeader />
      {/* 카테고리 이름 강조 */}
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

      {/* 상품 필터/리스트 */}
      <FilteredProductListFeature filterType="category" />
    </div>
  );
};

export default CategoryProductPage;
