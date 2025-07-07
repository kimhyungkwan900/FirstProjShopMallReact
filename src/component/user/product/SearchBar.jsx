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
      searchParams.set('page', 0); // 검색 시 첫 페이지로
      navigate(`?${searchParams.toString()}`);
      setKeyword('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex items-center w-full max-w-md border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="🔍 검색어를 입력하세요"
        className="flex-grow px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 transition-colors"
      >
        검색
      </button>
    </div>
  );
};

export default SearchBar;
