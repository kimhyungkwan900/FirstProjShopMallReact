import React from 'react';

// Pagination 컴포넌트 정의
// - page: 현재 페이지 번호 (0부터 시작)
// - totalPages: 전체 페이지 수
// - onPageChange: 페이지 변경 시 실행되는 콜백 함수
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesPerGroup = 8; // 한 번에 보여줄 페이지 버튼 수
  const currentGroup = Math.floor(currentPage / pagesPerGroup); // 현재 페이지 그룹 (ex: 0~4, 5~9 ...)
  const startPage = currentGroup * pagesPerGroup; // 현재 그룹의 시작 페이지
  const endPage = Math.min(startPage + pagesPerGroup, totalPages); // 그룹의 끝 페이지 (전체 페이지를 넘지 않도록 설정)

  // 페이지 번호 배열 생성 (ex: [0, 1, 2, 3, 4])
  const pageNumbers = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* ◀ 이전 그룹 버튼: 시작 페이지가 0보다 크면 보여줌 */}
        <button
          className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-100"
          onClick={() => onPageChange(startPage - 1)} disabled={startPage <= 0}// 이전 그룹 마지막 페이지로 이동
        >
          Prev
        </button>
      
      {/* 페이지 번호 버튼 렌더링 */}
      {pageNumbers.map((p) => (
        <button
          key={p} // React key 필수
          className={`px-3 py-1 text-sm rounded-md border
            ${p === currentPage
              ? 'bg-blue-500 text-white font-semibold border-blue-500' // 현재 페이지는 강조된 스타일
              : 'bg-white text-gray-800 hover:bg-gray-100 border-gray-300'} // 일반 페이지 버튼 스타일
          `}
          onClick={() => onPageChange(p)} // 해당 페이지로 이동
        >
          {p + 1} {/* 페이지 번호는 0부터 시작하므로 +1 */}
        </button>
      ))}

      {/* ▶ 다음 그룹 버튼: 아직 더 페이지가 남아있으면 보여줌 */}
        <button
          className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-100"
          onClick={() => onPageChange(endPage)} disabled={endPage >= totalPages}// 다음 그룹 첫 페이지로 이동
        >
          Next
        </button>
    </div>
  );
};

export default Pagination;
