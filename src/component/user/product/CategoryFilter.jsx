import React, { useEffect, useState } from 'react';
import { fetchAllCategories } from '../../../api/user/product/categoryApi';

const CategoryFilter = ({ setFilters }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllCategories();
        console.log('Fetched categories:', data);
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('카테고리 목록을 불러오는 중 오류 발생:', error);
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setFilters(prev => ({
      ...prev,
      categoryId: categoryId || null
    }));
  };

  return (
    <div className="category-filter">
      <h4>카테고리</h4>
      <ul>
        <li
          className={!selectedCategoryId ? 'selected' : ''}
          onClick={() => handleCategorySelect(null)}
        >
          전체 카테고리
        </li>
        {Array.isArray(categories) && categories.map((category) => (
          <li
            key={category.id}
            className={selectedCategoryId === category.id ? 'selected' : ''}
            onClick={() => handleCategorySelect(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
