import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(selectedCategory || '');

  useEffect(() => {
    setSelectedCategoryId(selectedCategory || '');
  }, [selectedCategory]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    onSelect(categoryId); // 필터 업데이트 함수 호출
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
