import { useEffect, useState } from "react";
import { getFaqList } from "../../../api/admin/faq/FaqApi"; //백엔드에서 faq 불러오기
import FaqListItem from "./FaqListItem";
import FaqSearchBar from "./FaqSearchBar";
import Pagination from "../../../components/common/Pagination";


const FaqListPage = () => {

  //faq 목록 저장할 상태
  const [faqList, setFaqList] = useState([]);

  //검색 조건 및 페이지 정보
  const [searchParams, setSearchParams] = useState({
    category: "",   
    keyWord: "",
    page: 1,
    size: 10,
  });

  //전체 페이지 수 
  const [totalCount, setTotalCount] =useState(0);

  //체크박스 선택된 id들 
  const [checkedItems, setCheckedItems] = useState([]);


  //체크박스 클릭시 실행 
  const handleCheck = (id) => {
   setCheckedItems((prev) =>
    prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  //faq 불러오기 
  const fetchFaqList = async () => {
    try {
      const response = await getFaqList(searchParams);//백엔드 호출
      setFaqList(response.dtoList); //데이터만 따로 저장
      setTotalCount(response.totalCount); // 전체 개수 저장
    } catch (e) {
      console.error("FAQ 목록을 불러오는데 실패했습니다.", e);
    }
  };


  // 검색 조건이 바뀌거나 페이지 바뀌면 다시 불러오기 
  useEffect(() => {
    fetchFaqList();
  }, [searchParams]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">FAQ 목록</h1>

      {/* 검색바 */}  
      <FaqSearchBar 
      searchParams={searchParams} 
      setSearchParams={setSearchParams} />

      {/* 목록 테이블 */}  
      <table className="w-full border">
        <thead>
          <tr className="bg-gray=100 text-left">
            <th className="border px-2">선택</th>
            <th className="border px-2">번호</th>
            <th className="border px-2">분류</th>
            <th className="border px-2">제목</th>
            <th className="border px-2">작성일</th>
          </tr>
        </thead>
        <tbody>
          {faqList.map((faq, index) => (
            <FaqListItem 
            key={faq.id} 
            faq={faq} 
            index={index + 1}
            isChecked={checkedItems.includes(faq.id)}
            onCheck={handleCheck}/>
          ))}
        </tbody>
      </table>

      {/* 삭제 버튼 */}
      <div className="my-4">
        
      </div>

      {/* 페이지네이션 */}
      <Pagination
      currentPage = {searchParams.page}
      totalCount = {totalCount}
      pageSize = {searchParams.size}
      onPageChange = {(newPage)=>
        setSearchParams({ ...searchParams, page: newPage })
      }/>
    </div>
  );
};

export default FaqListPage;
