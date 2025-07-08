import React from 'react';

const SortOptions = ({ sort, direction, setSort, setDirection }) => {
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const toggleDirection = () => {
    setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* 정렬 기준 셀렉트 */}
      <div className="relative">
        <select
          value={sort}
          onChange={handleSortChange}
          className="appearance-none px-4 py-2 pr-10 rounded-full border border-gray-300 bg-white shadow-sm text-sm text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="name">📅 이름순</option>
          <option value="viewCount">🔥 인기순</option>
          <option value="price">💰 가격순</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          ▼
        </div>
      </div>

      {/* 정렬 방향 토글 버튼 */}
      <button
        onClick={toggleDirection}
        className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-blue-50 text-sm text-gray-700 shadow-sm transition duration-200"
        title={direction === 'asc' ? '오름차순 정렬' : '내림차순 정렬'}
      >
        {direction === 'asc' ? '🔼 오름차순' : '🔽 내림차순'}
      </button>
    </div>
  );
};

export default SortOptions;
