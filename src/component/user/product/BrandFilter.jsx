import React, { useEffect, useState } from 'react';
import { fetchBrands } from '../../../api/user/product/brandApi';

const BrandFilter = ({ setFilters }) => {
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  useEffect(() => {
    const loadBrands = async () => {
      const data = await fetchBrands();
      setBrands(data);
    };
    loadBrands();
  }, []);

  const handleBrandSelect = (brandId) => {
    setSelectedBrandId(brandId);
    setFilters(prev => ({ ...prev, brandId }));
  };

  return (
    <div className="brand-filter">
      <h4>프랜드</h4>
      <ul>
        <li
          className={!selectedBrandId ? 'selected' : ''}
          onClick={() => handleBrandSelect(null)}
        >
          목록 전체
        </li>
        {brands.map((brand) => (
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
