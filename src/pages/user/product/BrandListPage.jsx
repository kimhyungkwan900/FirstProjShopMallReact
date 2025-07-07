import React, { useEffect, useState } from 'react';
import { fetchAllBrands } from '../../../api/user/product/brandApi';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../component/common/Footer';
import MainHeader from '../../../features/common/Header/MainHeader';

const BrandListPage = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await fetchAllBrands();
        if (Array.isArray(data)) {
          setBrands(data);
        } else if (Array.isArray(data.brands)) {
          setBrands(data.brands);
        } else {
          console.error('⛔️ 알 수 없는 브랜드 데이터 형식:', data);
          setBrands([]);
        }
      } catch (error) {
        console.error('❌ 브랜드 불러오기 실패:', error);
        setBrands([]);
      }
    };

    loadBrands();
  }, []);

  const handleClick = (brandId) => {
    navigate(`/products/brand/${brandId}`);
  };

  // 이미지 경로 생성 함수
  const getBrandImageSrc = (brandName) => {
    return `/images/brands/${brandName}.png`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <MainHeader />

      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        💼 브랜드 둘러보기
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-20">
        {brands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => handleClick(brand.id)}
            className="bg-white shadow-md rounded-2xl p-4 cursor-pointer hover:scale-105 hover:shadow-xl transition transform duration-300 ease-in-out flex flex-col items-center"
          >
            <img
              src={getBrandImageSrc(brand.name)}
              alt={`${brand.name} 로고`}
              className="w-16 h-16 object-contain mb-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/brands/default.png';
              }}
            />
            <span className="text-gray-800 font-medium text-center">
              {brand.name}
            </span>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default BrandListPage;
