import React, { useEffect, useState } from 'react';
import { fetchAllBrands } from '../../../api/user/product/brandApi';

const BrandFilter = ({ setFilters }) => {
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await fetchAllBrands();
        console.log('Fetched brands:', data);
        setBrands(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('브랜드 목록을 불러오는 중 오류 발생:', error);
        setBrands([]);
      }
    };

    loadBrands();
  }, []);

  const handleBrandSelect = (brandId) => {
    setSelectedBrandId(brandId);
    setFilters(prev => ({
      ...prev,
      brandId: brandId || null
    }));
  };

  return (
    <div className="brand-filter">
      <h4>브랜드</h4>
      <ul>
        <li
          className={!selectedBrandId ? 'selected' : ''}
          onClick={() => handleBrandSelect(null)}
        >
          전체 브랜드
        </li>
        {Array.isArray(brands) && brands.map((brand) => (
          <li
            key={brand.id}
            className={selectedBrandId === brand.id ? 'selected' : ''}
            onClick={() => handleBrandSelect(brand.id)}
          >
            {brand.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;