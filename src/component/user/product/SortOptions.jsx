import React from 'react';

const SortOptions = ({ sort, direction, setSort, setDirection }) => {
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const toggleDirection = () => {
    setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="sort-options">
      <select value={sort} onChange={handleSortChange}>
        <option value="createdAt">최신순</option>
        <option value="viewCount">인기순</option>
        <option value="price">가격순</option>
      </select>
      <button onClick={toggleDirection}>
        {direction === 'asc' ? '▲' : '▼'}
      </button>
    </div>
  );
};

export default SortOptions;
