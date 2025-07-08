
const MyOrderSearch = ({ keyword, setKeyword, onSearch }) => {
  return (
    <div className="w-full px-4 mt-10">
      <div className="flex items-center gap-2 p-4 bg-white rounded-xl w-full max-w-2xl mx-auto">
        <label htmlFor="productName" className="text-sm font-medium text-gray-700 whitespace-nowrap">
          상품명 : 
        </label>
        <input
          type="text"
          id="productName"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색할 상품명을 입력하세요"
          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onSearch}
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition">
          검색
        </button>
      </div>
    </div>
  );
};

export default MyOrderSearch;