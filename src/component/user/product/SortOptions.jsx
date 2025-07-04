import React from 'react';

const SortOptions = ({ sort, direction, setSort, setDirection }) => {
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const toggleDirection = () => {
    setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="flex items-center gap-3">
      {/* 정렬 기준 셀렉트 */}
      <select
        value={sort}
        onChange={handleSortChange}
        className="px-4 py-2 rounded-md border border-gray-300 shadow-sm text-sm text-gray-700 bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="createdAt">📅 최신순</option>
        <option value="viewCount">🔥 인기순</option>
        <option value="price">💰 가격순</option>
      </select>

      {/* 정렬 방향 토글 버튼 */}
      <button
        onClick={toggleDirection}
        className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-sm text-gray-700 shadow-sm transition"
        title={direction === 'asc' ? '오름차순 정렬' : '내림차순 정렬'}
      >
        {direction === 'asc' ? '▲ 오름차순' : '▼ 내림차순'}
      </button>
    </div>
  );
};

export default SortOptions;
