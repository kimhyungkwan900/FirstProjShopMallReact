import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilteredProductListFeature from '../../../features/user/product/FilteredProductListFeature';
import { fetchAllBrands } from '../../../api/user/product/brandApi';
import Footer from '../../../component/common/Footer';
import MainHeader from '../../../features/common/Header/MainHeader';

const BrandProductPage = () => {
  const { brandId } = useParams();
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
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <MainHeader />
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

      <FilteredProductListFeature filterType="brand" />
    </div>
  );
};

export default BrandProductPage;
