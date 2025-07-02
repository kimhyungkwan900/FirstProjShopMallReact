// src/pages/user/product/CategoryProductPage.jsx
import React from 'react';
import FilteredProductListFeature from '../../../features/user/product/FilteredProductListFeature';

const CategoryProductPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">카테고리별 상품</h2>
      <FilteredProductListFeature filterType="category" />
    </div>
  );
};

export default CategoryProductPage;
