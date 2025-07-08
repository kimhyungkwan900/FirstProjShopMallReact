import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (trimmed) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('keyword', trimmed);
      searchParams.set('page', 0); // 검색 시 첫 페이지로 이동
      navigate(`?${searchParams.toString()}`);
      setKeyword('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="w-full max-w-md flex items-center bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden transition focus-within:ring-2 focus-within:ring-blue-400">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="🔍 검색어를 입력하세요"
        className="flex-grow px-5 py-2 text-sm text-gray-800 bg-transparent focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 text-sm font-medium transition-colors"
      >
        검색
      </button>
    </div>
  );
};

export default SearchBar;
