import { useState } from "react";
import AdminReviewContent from "../../../component/admin/review/AdminReviewContent";
import AdminReviewSearch from "../../../component/admin/review/AdminReviewSearch";
import MypageMenu from "../../../component/user/myOrder/MyPageSideMenuBar";
import AdminLayout from "../../../layouts/AdminLayout";

const AdminReviewPage = () => {
  const [filterType, setFilterType] = useState("ALL");
  const [page, setPage] = useState(0); // 0부터 시작 (Spring Pageable 기준)
  const [searchParams, setSearchParams] = useState({ type: "", keyword: "" });

  const handleFilterChange = (type) => {
    setFilterType(type);
    setPage(0); // 필터 바뀌면 첫 페이지로 초기화
  };


  const handleSearch = ({ type, keyword }) => {
    setSearchParams({ type, keyword });
    setPage(0); // 검색 시 첫 페이지로
  };

  return (
      <AdminLayout>
    <div className="mt-10">

      <h2 className="text-2xl ml-10 mt-3 mb-6">관리자 리뷰 페이지</h2>
      <hr className="mb-6" />
      <AdminReviewSearch onSearch={handleSearch} />
      <div className="mt-6 flex justify-center">
        <button onClick={() => handleFilterChange("ALL")} className={`p-2 ${filterType === "ALL" ? "bg-blue-500" : "bg-gray-600"} text-white rounded m-1 w-[15%]`}>
          전체리뷰
        </button>
        <button onClick={() => handleFilterChange("report")} className={`p-2 ${filterType === "report" ? "bg-blue-500" : "bg-gray-600"} text-white rounded m-1 w-[15%]`}>
          신고 받은 리뷰
        </button>
        <button onClick={() => handleFilterChange("blind")} className={`p-2 ${filterType === "blind" ? "bg-blue-500" : "bg-gray-600"} text-white rounded m-1 w-[15%]`}>
          블라인드된 리뷰
        </button>
      </div>

      <AdminReviewContent
            filterType={filterType}
            page={page}
            setPage={setPage}
            searchParams={searchParams}/>
    </div>
    </AdminLayout>
  );
};

export default AdminReviewPage;