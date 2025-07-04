import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const pagesPerGroup = 5;
  const currentGroup = Math.floor(page / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup, totalPages);

  const pageNumbers = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);

  return (
    <div className="pagination flex items-center justify-center gap-2 mt-4">
      {/* ◀ 이전 그룹 */}
      {startPage > 0 && (
        <button
          className="px-3 py-1 border rounded bg-white text-black"
          onClick={() => onPageChange(startPage - 1)}
        >
          ◀
        </button>
      )}

      {/* 현재 그룹 페이지 번호들 */}
      {pageNumbers.map(p => (
        <button
          key={p}
          className={`px-3 py-1 border rounded ${p === page ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => onPageChange(p)}
        >
          {p + 1}
        </button>
      ))}

      {/* ▶ 다음 그룹 */}
      {endPage < totalPages && (
        <button
          className="px-3 py-1 border rounded bg-white text-black"
          onClick={() => onPageChange(endPage)}
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default Pagination;
