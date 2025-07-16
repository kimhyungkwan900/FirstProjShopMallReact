import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesPerGroup = 8;
  const currentGroup = Math.floor(currentPage / pagesPerGroup);
  const startPage = currentGroup * pagesPerGroup;
  const endPage = Math.min(startPage + pagesPerGroup, totalPages);

  const pageNumbers = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
        <button
          className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-100"
          onClick={() => onPageChange(startPage - 1)} disabled={startPage <= 0}
        >
          Prev
        </button>
      
      {pageNumbers.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 text-sm rounded-md border
            ${p === currentPage
              ? 'bg-blue-500 text-white font-semibold border-blue-500'
              : 'bg-white text-gray-800 hover:bg-gray-100 border-gray-300'} // 일반 페이지 버튼 스타일
          `}
          onClick={() => onPageChange(p)}
        >
          {p + 1}
        </button>
      ))}

        <button
          className="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-100"
          onClick={() => onPageChange(endPage)} disabled={endPage >= totalPages}
        >
          Next
        </button>
    </div>
  );
};

export default Pagination;
