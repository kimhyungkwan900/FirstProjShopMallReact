import React, { useEffect, useState } from 'react';
import { fetchAllBrands } from '../../../api/user/product/brandApi';
import { useNavigate } from 'react-router-dom';

import Footer from '../../../component/common/Footer';
import MainHeader from '../../../features/common/Header/MainHeader';

// 브랜드 목록 페이지 컴포넌트 정의
const BrandListPage = () => {
  const [brands, setBrands] = useState([]);     // 브랜드 목록 상태
  const navigate = useNavigate();               // 페이지 이동 함수

  // 컴포넌트 마운트 시 브랜드 목록 로딩
  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await fetchAllBrands(); // API 호출

        // 응답 데이터가 배열 형식인지 확인하고 설정
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

    loadBrands(); // 호출 실행
  }, []);

  // 브랜드 박스를 클릭했을 때 해당 브랜드 상품 목록으로 이동
  const handleClick = (brandId) => {
    navigate(`/products/brand/${brandId}`);
  };

  // 브랜드 이름을 기반으로 이미지 경로 생성
  const getBrandImageSrc = (brandName) => `/images/brands/${brandName}.png`;

  return (
    // 전체 배경 및 최소 높이 설정
    <div className="w-full bg-gray-50 min-h-screen">
      {/* ✅ 상단 헤더 */}
      <MainHeader />

      {/* ✅ 본문 콘텐츠 - 고정 폭 레이아웃 */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* 제목 */}
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          💼 브랜드 둘러보기
        </h2>

        {/* 브랜드 목록을 그리드로 렌더링 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-20">
          {brands.map((brand) => (
            <div
              key={brand.id}                           // React key
              onClick={() => handleClick(brand.id)}    // 클릭 시 이동
              className="bg-white shadow-md rounded-2xl p-4 cursor-pointer hover:scale-105 hover:shadow-xl transition transform duration-300 ease-in-out flex flex-col items-center"
            >
              {/* 브랜드 이미지 */}
              <img
                src={getBrandImageSrc(brand.name)}     // 브랜드 이름 기반 이미지 경로
                alt={`${brand.name} 로고`}            // 접근성 텍스트
                className="w-16 h-16 object-contain mb-2"
                onError={(e) => {
                  e.target.onerror = null;             // 무한 루프 방지
                  e.target.src = '/images/brands/default.png'; // 이미지 로드 실패 시 기본 이미지
                }}
              />

              {/* 브랜드명 표시 */}
              <span className="text-gray-800 font-medium text-center">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* 하단 공통 푸터 */}
      <Footer />
    </div>
  );
};

export default BrandListPage;
