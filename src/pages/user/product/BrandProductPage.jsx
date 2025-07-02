// src/pages/user/product/BrandProductPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import FilteredProductListFeature from '../../../features/user/product/FilteredProductListFeature';

const BrandProductPage = () => {
  const { brandId } = useParams();

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mt-6 mb-4">
        해당 브랜드 상품 목록
      </h2>
      <FilteredProductListFeature filterKey="brandId" filterValue={brandId} />
    </div>
  );
};

export default BrandProductPage;
