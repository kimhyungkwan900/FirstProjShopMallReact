import React, { useState, useEffect } from 'react';

// 카테고리 필터 컴포넌트 정의
// props: categories (카테고리 목록), selectedCategory (현재 선택된 카테고리 ID), onSelect (선택 변경 시 호출될 함수)
const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
  // 선택된 카테고리 ID를 상태로 관리. 초기값은 selectedCategory 또는 빈 문자열
  const [selectedCategoryId, setSelectedCategoryId] = useState(selectedCategory || '');

  // props로 전달받은 selectedCategory가 바뀔 때 내부 상태도 업데이트
  useEffect(() => {
    setSelectedCategoryId(selectedCategory || '');
  }, [selectedCategory]);

  // 카테고리를 클릭했을 때 실행되는 함수
  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId); // 상태 업데이트
    onSelect(categoryId);              // 상위 컴포넌트에 선택된 카테고리 ID 전달
  };

  return (
    <div className="category-filter">
      <h4>카테고리</h4>
      <ul>
        {/* '전체 카테고리' 선택 항목 (선택 해제용) */}
        <li
          className={!selectedCategoryId ? 'selected' : ''} // 선택되지 않은 상태면 강조
          onClick={() => handleCategorySelect(null)}        // 클릭 시 선택 해제
        >
          전체 카테고리
        </li>

        {/* 카테고리 배열이 유효한 경우에만 목록 렌더링 */}
        {Array.isArray(categories) && categories.map((category) => (
          <li
            key={category.id}                                       // React key 지정
            className={selectedCategoryId === category.id ? 'selected' : ''} // 선택된 항목 강조
            onClick={() => handleCategorySelect(category.id)}       // 클릭 시 해당 카테고리 선택
          >
            {category.name} // 카테고리 이름 표시
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
