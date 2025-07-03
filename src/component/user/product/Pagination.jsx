import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i);
  return (
    <div className="pagination flex gap-2 justify-center mt-4">
      {pages.map(p => (
        <button
          key={p}
          className={`px-3 py-1 border rounded ${p === page ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          onClick={() => onPageChange(p)}
        >
          {p + 1}
        </button>
      ))}
    </div>
  );
};


export default Pagination;