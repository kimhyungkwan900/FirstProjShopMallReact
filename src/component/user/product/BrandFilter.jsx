import React, { useEffect, useState } from 'react';
import { fetchAllBrands } from '../../../api/user/product/brandApi';

// BrandFilter 컴포넌트 정의 - props로 setFilters(필터 상태 설정 함수)를 받음
const BrandFilter = ({ setFilters }) => {
  // 브랜드 목록을 저장할 상태 변수
  const [brands, setBrands] = useState([]);
  // 현재 선택된 브랜드 ID를 저장할 상태 변수
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  // 컴포넌트가 처음 렌더링될 때 브랜드 목록을 불러옴
  useEffect(() => {
    const loadBrands = async () => {
      try {
        // 브랜드 데이터 API 호출
        const data = await fetchAllBrands();
        console.log('Fetched brands:', data);
        // 받아온 데이터가 배열이면 상태에 저장, 아니면 빈 배열
        setBrands(Array.isArray(data) ? data : []);
      } catch (error) {
        // 에러 발생 시 콘솔에 로그 출력하고 빈 배열 설정
        console.error('브랜드 목록을 불러오는 중 오류 발생:', error);
        setBrands([]);
      }
    };

    // 브랜드 불러오기 함수 실행
    loadBrands();
  }, []);

  // 브랜드 선택 시 실행되는 핸들러
  const handleBrandSelect = (brandId) => {
    setSelectedBrandId(brandId); // 선택된 브랜드 상태 업데이트
    setFilters(prev => ({       // 상위 컴포넌트의 필터 상태 업데이트
      ...prev,
      brandId: brandId || null  // 브랜드가 선택되지 않았을 경우 null로 설정
    }));
  };

  return (
    <div className="brand-filter">
      <h4>브랜드</h4>
      <ul>
        {/* 전체 브랜드 선택 옵션 */}
        <li
          className={!selectedBrandId ? 'selected' : ''} // 아무 브랜드도 선택되지 않았으면 강조 표시
          onClick={() => handleBrandSelect(null)}        // 클릭 시 필터에서 브랜드 제거
        >
          전체 브랜드
        </li>
        
        {/* 브랜드 리스트 렌더링 */}
        {Array.isArray(brands) && brands.map((brand) => (
          <li
            key={brand.id}                                           // React key 설정
            className={selectedBrandId === brand.id ? 'selected' : ''} // 선택된 브랜드에 강조 표시
            onClick={() => handleBrandSelect(brand.id)}              // 클릭 시 해당 브랜드 선택
          >
            {brand.name}                                             // 브랜드 이름 표시
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
