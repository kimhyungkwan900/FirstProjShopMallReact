import React, { useEffect, useState } from 'react';
import { fetchAllBrands } from '../../../api/user/product/brandApi';
import { useNavigate } from 'react-router-dom';

const BrandListPage = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await fetchAllBrands();
        console.log('🔍 브랜드 응답:', data);

        if (Array.isArray(data)) {
          setBrands(data); // 응답이 배열이면 그대로
        } else if (Array.isArray(data.brands)) {
          setBrands(data.brands); // 객체 안에 brands 배열이 있는 경우
        } else {
          console.error('⛔️ 알 수 없는 브랜드 데이터 형식:', data);
          setBrands([]); // fallback
        }
      } catch (error) {
        console.error('❌ 브랜드 불러오기 실패:', error);
        setBrands([]); // 에러 fallback
      }
    };

    loadBrands();
  }, []);

  const handleClick = (brandId) => {
    navigate(`/products/brand/${brandId}`);
  };

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">브랜드 목록</h2>
      <ul className="space-y-2">
        {brands.map((brand) => (
          <li
            key={brand.id}
            onClick={() => handleClick(brand.id)}
            className="cursor-pointer text-blue-600 hover:underline"
          >
            {brand.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandListPage;
