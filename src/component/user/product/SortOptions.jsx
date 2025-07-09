import React from 'react';

// 정렬 옵션을 선택/변경할 수 있는 컴포넌트
// props:
// - sort: 현재 선택된 정렬 기준 (예: name, price, viewCount 등)
// - direction: 현재 정렬 방향 ('asc' 또는 'desc')
// - setSort: 정렬 기준을 변경하는 함수
// - setDirection: 정렬 방향을 변경하는 함수
const SortOptions = ({ sort, direction, setSort, setDirection }) => {
  // 정렬 기준이 변경되었을 때 실행되는 핸들러
  const handleSortChange = (e) => {
    setSort(e.target.value); // 선택된 값을 상위 컴포넌트로 전달
  };

  // 정렬 방향을 토글 (asc ↔ desc)
  const toggleDirection = () => {
    setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      
      {/* ▼ 정렬 기준 셀렉트 박스 */}
      <div className="relative">
        <select
          value={sort}           // 현재 선택된 정렬 기준
          onChange={handleSortChange} // 선택 변경 시 이벤트 핸들러
          className="appearance-none px-4 py-2 pr-10 rounded-full border border-gray-300 bg-white shadow-sm text-sm text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="name">📅 이름순</option>
          <option value="viewCount">🔥 인기순</option>
          <option value="price">💰 가격순</option>
        </select>

        {/* 오른쪽 ▼ 아이콘 - 기본 select 화살표 대체용 */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          ▼
        </div>
      </div>

      {/* 🔼🔽 정렬 방향 토글 버튼 */}
      <button
        onClick={toggleDirection} // 클릭 시 정렬 방향 토글
        className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-blue-50 text-sm text-gray-700 shadow-sm transition duration-200"
        title={direction === 'asc' ? '오름차순 정렬' : '내림차순 정렬'}
      >
        {direction === 'asc' ? '🔼 오름차순' : '🔽 내림차순'}
      </button>
    </div>
  );
};

export default SortOptions;
