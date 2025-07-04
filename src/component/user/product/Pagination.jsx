import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const pagesPerGroup = 5;
  const currentGroup = Math.floor(page / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup, totalPages);

  const pageNumbers = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* ◀ 이전 그룹 */}
      {startPage > 0 && (
        <button
          className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition"
          onClick={() => onPageChange(startPage - 1)}
        >
          ◀
        </button>
      )}

      {/* 페이지 번호 버튼 */}
      {pageNumbers.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 text-sm rounded-md border transition
            ${p === page
              ? 'bg-blue-500 text-white font-semibold border-blue-500'
              : 'bg-white text-gray-800 hover:bg-gray-100 border-gray-300'}
          `}
          onClick={() => onPageChange(p)}
        >
          {p + 1}
        </button>
      ))}

      {/* ▶ 다음 그룹 */}
      {endPage < totalPages && (
        <button
          className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition"
          onClick={() => onPageChange(endPage)}
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default Pagination;
