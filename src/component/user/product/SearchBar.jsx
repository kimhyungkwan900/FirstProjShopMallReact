import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// 검색 바(SearchBar) 컴포넌트 정의
const SearchBar = () => {
  // 검색어 상태를 저장하는 변수
  const [keyword, setKeyword] = useState('');
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();
  // 현재 URL의 쿼리스트링 등을 가져오는 location 객체
  const location = useLocation();

  // 검색 실행 함수
  const handleSearch = () => {
    const trimmed = keyword.trim(); // 앞뒤 공백 제거
    if (trimmed) {
      // 기존 URL 쿼리스트링을 유지하면서 keyword와 page만 설정
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('keyword', trimmed); // 검색 키워드 설정
      searchParams.set('page', 0); // 검색 시 항상 첫 페이지부터 시작
      navigate(`?${searchParams.toString()}`); // 현재 경로 + 쿼리스트링으로 이동
      setKeyword(''); // 입력창 초기화
    }
  };

  // 엔터 키 입력 시 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="w-full max-w-md flex items-center bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden transition focus-within:ring-2 focus-within:ring-blue-400">
      {/* 입력창: 실시간 입력값 반영, 엔터 키 감지 */}
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)} // 입력 값 업데이트
        onKeyDown={handleKeyDown} // Enter 키 처리
        placeholder="🔍 검색어를 입력하세요"
        className="flex-grow px-5 py-2 text-sm text-gray-800 bg-transparent focus:outline-none"
      />
      
      {/* 검색 버튼 */}
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
