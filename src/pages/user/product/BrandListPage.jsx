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
          {brands.length > 0 ? (
            brands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => handleClick(brand.id)}
                className="group bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-lg hover:border-blue-400 transform hover:-translate-y-1 transition-all duration-300 ease-in-out text-center"
              >
                <img
                  src={getBrandImageSrc(brand.name)}
                  alt={`${brand.name} 로고`}
                  className="w-20 h-20 object-contain mx-auto mb-3 group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/brands/default.png';
                  }}
                />
                <span className="text-gray-800 font-semibold text-base">
                  {brand.name}
                </span>
                {/* 선택적 슬로건 */}
                {/* <p className="text-xs text-gray-500 mt-1">당신의 스타일을 완성하세요</p> */}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">브랜드가 존재하지 않습니다.</p>
          )}
        </div>

      </main>

      {/* 하단 공통 푸터 */}
      <Footer />
    </div>
  );
};

export default BrandListPage;
