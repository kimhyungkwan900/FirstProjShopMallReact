import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
  return (
    <select value={selectedCategory} onChange={e => onSelect(e.target.value)}>
      <option value="">전체 카테고리</option>
      {categories.map(category => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </select>
  );
};

export default CategoryFilter;