//검색 바 
const FaqSearchBar = ({ searchParams, setSearchParams, onSearch }) => {
  const handleChange = (e) => {
    const {name, value} = e.target;

    setSearchParams({
      ...searchParams,
      [name] : value,
    });
  };

  //검색 버튼 클릭시 실행 
  const handleSearch = (e) =>{
   e.preventDefault(); //새로고침 방지

    const trimmedCategory = searchParams.category?.trim();
    const trimmedKeyWord = searchParams.keyWord?.trim();

    if(!trimmedCategory){
      alert("카테고리를 선택하세요");
      return;
    }

    onSearch({
      category: trimmedCategory,
      keyWord: trimmedKeyWord,
      
    });
  };
   
  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-4">
      <select
        name="category"
        value={searchParams.category}
        onChange={handleChange}
         className="border px-2 py-1 rounded"
      >
        <option value="">카테고리 선택</option>
        <option value="배송">배송</option>
        <option value="취소/교환/반품">취소/교환/반품</option>
        <option value="환불">환불</option>
        <option value="주문/결제">주문/결제</option>
        <option value="기타">기타</option>
      </select>

      <input
        type="text"
        name="keyWord"
        value={searchParams.keyWord}
        onChange={handleChange}
        placeholder="검색어 입력"
        className="border px-2 py-1 rounded w-60"
      />

      <button 
      type="submit"
      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">검색</button>
    </form>
  );
};

export default FaqSearchBar;
