import React, { useState } from 'react';

const SearchBar = ({ setFilters, setPage }) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword) {
      setFilters(prev => ({ ...prev, keyword: trimmedKeyword }));
      setPage(0); // 검색 시 페이지 번호 초기화
      setKeyword(''); // ✅ 검색 후 입력 필드 초기화
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchBar;
