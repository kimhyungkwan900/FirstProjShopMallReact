import { useState } from "react";

const AdminReviewSearch = ({ onSearch }) => {
  const [searchType, setSearchType] = useState("writer"); // 초기값: 작성자명
  const [searchInput, setSearchInput] = useState("");

  const handleSearchClick = () => {
    onSearch({ type: searchType, keyword: searchInput });
  };

  return (
    <div className="m-auto min-w-[350px] w-[20%] flex justify-center">
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="border rounded w-[25%] mr-1 h-7"
      >
        <option value="writer">작성자명</option>
        <option value="product">상품명</option>
      </select>

      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="border rounded w-[60%] h-7 mr-1"
        placeholder="검색어 입력"
      />

      <button
        onClick={handleSearchClick}
        className="border rounded h-7 w-[15%] bg-blue-500 text-white text-sm hover:bg-blue-600"
      >
        검색
      </button>
    </div>
  );
};

export default AdminReviewSearch;