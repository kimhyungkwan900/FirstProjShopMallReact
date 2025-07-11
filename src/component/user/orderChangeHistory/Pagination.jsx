const Pagination = ({ page, totalPages, onPageChange }) => {

  if(totalPages <= 1){
    return null;
  }

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