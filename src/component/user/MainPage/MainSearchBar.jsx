import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi"; // react-icons 패키지를 사용할 경우

const MainSearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (trimmed) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('keyword', trimmed);
      searchParams.set('page', 0);
      navigate(`/products?${searchParams.toString()}`);
      setKeyword('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex items-center max-w-xl w-full rounded-full border border-gray-300 shadow-sm bg-white overflow-hidden">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="원하는 상품을 검색해보세요"
        className="flex-grow px-5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2.5 bg-white-300 text-black rounded-r-full flex items-center justify-center"
        title="검색"
      >
        <FiSearch className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MainSearchBar;