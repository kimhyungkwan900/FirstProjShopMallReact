import React from 'react';

const SortOptions = ({ sort, direction, onChange }) => (
  <div className="sort-options">
    <select value={sort} onChange={e => onChange(e.target.value, direction)}>
      <option value="createdAt">최신순</option>
      <option value="viewCount">인기순</option>
      <option value="price">가격순</option>
    </select>
    <button onClick={() => onChange(sort, direction === 'asc' ? 'desc' : 'asc')}>
      {direction === 'asc' ? '▲' : '▼'}
    </button>
  </div>
);

export default SortOptions;