import { useEffect, useState } from "react";
import { deleteFaqs, getFaqList } from "../../../api/admin/faq/FaqApi"; 
import FaqListItem from "./FaqListItem";
import FaqSearchBar from "./FaqSearchBar";
import Pagination from "../../../component/admin/faq/Pagination";
import { useNavigate,  useLocation } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import { useCsrfToken } from "../../../hooks/common/useCsrfToken";



//목록 페이지 겸 메인

const FaqListPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const csrfToken = useCsrfToken();

  //faq 목록 저장할 상태
  const [faqList, setFaqList] = useState([]);

  //전체 페이지 수 
  const [totalCount, setTotalCount] =useState(0);

  //체크박스 선택된 id들 
  const [checkedItems, setCheckedItems] = useState([]);

  //검색 조건 및 페이지 정보
  const [searchParams, setSearchParams] = useState({
    category: "",   
    keyWord: "",
    page: 1,
    size: 10,
  });

  const [isSearching, setIsSearching] = useState(false);


  //체크박스 클릭시 id 저장 또는 제거 
  const handleCheck = (id) => {
   setCheckedItems((prev) =>
    prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };


  //faq 불러오기 
  const fetchFaqList = async (params = searchParams) => {

    try {
      const response = await getFaqList(params);

      setFaqList(response.dtoList || []); //데이터만 따로 저장
      setTotalCount(response.totalCount || 0); // 전체 개수 저장

    } catch (e) {
      console.error("FAQ 목록을 불러오는데 실패했습니다.", e);
    }
  };


   //검색창에서 검색 실행 시
  const handleSearch = ({ category, keyWord }) => {
    setIsSearching(true);

    const newParams = {
      category,
      keyWord,
      page: 1,
      size: 10,
    };

    setSearchParams(newParams);     // 상태 업데이트
    fetchFaqList(newParams);        // 바로 목록 요청 실행
  };


  // 검색 조건이 바뀌거나 페이지 바뀌면 다시 불러오기 
  useEffect(() => {
    fetchFaqList();
    setIsSearching(false); // 검색 플래그 초기화
  }, [searchParams.page, searchParams.size]);


    //faq 삭제하기
  const handelDeleteSelected = async() =>{
    if(checkedItems.length === 0){
      alert("삭제할 항목을 선택하세요.");
      return;
    }

    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?")
    if(!confirmDelete) return;

    try{
      await deleteFaqs(checkedItems, csrfToken);
      alert("삭제가 완료 되었습니다");
      setCheckedItems([]);
      fetchFaqList();
    }catch (e){
      console.log("삭제 실패", e);
      alert("삭제 중 오류가 발생했습니다");
    }
  };


  return (
    <AdminLayout>
    <div className="flex justify-center p-8">
       <div className="w-full max-w-5xl text-left">
      <h1 className="text-2xl font-bold mb-4">FAQ 목록</h1>

      {/* 검색바 */}  
      <FaqSearchBar 
      searchParams={searchParams}
      setSearchParams={setSearchParams} 
      onSearch={handleSearch}/>

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
          {faqList.length > 0 ? (
            faqList.map((faq, index) => (
            <FaqListItem 
              key={faq.id} 
              faq={faq} 
              index={index + 1 + (searchParams.page - 1) * searchParams.size}
              isChecked={checkedItems.includes(faq.id)}
              onCheck={handleCheck}
            />
            ))
            ) : (
            <tr>
            <td colSpan="5" className="text-center py-4">FAQ가 없습니다.</td>
          </tr>
        )}
      </tbody>
      </table>

      {/* 삭제 버튼 */}
      <div className="my-4 flex justify-between items-center">
        <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handelDeleteSelected}
        disabled={checkedItems.length === 0}>
          삭제 
        </button>

      {/*등록 버튼 */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate("/admin/faq/register")}>
          등록하기
        </button>
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
    </div>
    </AdminLayout>
  );
};

export default FaqListPage;
