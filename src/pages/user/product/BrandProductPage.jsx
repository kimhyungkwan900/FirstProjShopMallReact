// src/pages/user/product/BrandProductPage.jsx
import React, { useEffect, useState } from 'react';
import FilteredProductListFeature from '../../../features/user/product/FilteredProductListFeature';
import { fetchAllBrands } from '../../../api/user/product/brandApi';
import { useParams } from 'react-router-dom';

const BrandProductPage = () => {
  const { brandId } = useParams(); // URL 파라미터
  const [brandName, setBrandName] = useState('');

  useEffect(() => {
    const loadBrandName = async () => {
      try {
        const brands = await fetchAllBrands();
        const brand = brands.find((b) => String(b.id) === String(brandId));
        if (brand) {
          setBrandName(brand.name);
        } else {
          setBrandName('알 수 없는 브랜드');
        }
      } catch (error) {
        console.error('브랜드 이름 조회 실패:', error);
        setBrandName('브랜드 로딩 실패');
      }
    };

    loadBrandName();
  }, [brandId]);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {brandName ? `"${brandName}" 상품 목록` : '브랜드 상품 목록'}
      </h2>
      <FilteredProductListFeature filterType="brand" />
    </div>
  );
};

export default BrandProductPage;