const Pagination = ({ page, totalPages, onPageChange }) => {
  // totalPages가 너무 크면, 일부 페이지만 보여주도록 추가 커스터마이징도 가능

  const pages = [...Array(totalPages).keys()]; // [0, 1, 2, ..., totalPages-1]

  return (
    <div className="flex justify-center gap-2 mt-6">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 border rounded ${
            p === page ? "bg-blue-600 text-white font-bold" : "bg-white"
          }`}
        >
          {p + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;