import { useEffect, useState } from "react";
import OrderFilterButton from "../../../component/user/orderChangeHistory/OrderFilterButton";
import MainHeader from "../../../features/common/Header/MainHeader";
import MainFooter from "../../../features/common/Footer/MainFooter";
import OrderChangeContent from "../../../component/user/orderChangeHistory/OrderChangeContent";
import Pagination from "../../../component/user/orderChangeHistory/Pagination";
import { findChangeList } from "../../../api/user/myOrder/MyOrderChangeHistoryApi";
import MypageMenu from "../../../component/user/myOrder/MypageMenu";
import { useContext } from "react";
import { UserContext } from "../../../component/common/Context/UserContext";

const MyOrderChangeHistoryPage = () => {
  const [filterType, setFilterType] = useState("ALL");
  const [changeList, setChangeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  
 const {user} = useContext(UserContext);
 const memberId = user?.id;


  const fetchData = async (pageNumber = 0, filter = filterType) => {
    setLoading(true);
    try {
      const returnType = filter === "ALL" ? null : `${filter}_REQUEST`;
      const res = await findChangeList({
        memberId,
        returnType,
        page: pageNumber,
        size: 5,
      });
      setChangeList(res.content);
      setTotalPages(res.totalPages);
      setPage(res.number); // 현재 페이지 번호 백엔드에서 받아오기 (0-based)
    } catch (error) {
      console.error("내역 불러오기 실패", error);
      setChangeList([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(0, filterType);
  }, [filterType]);

  useEffect(() => {
    fetchData(page, filterType);
  }, [page]);

  return (
    <div>
      <MainHeader />
      <h2 className="text-2xl text-center mt-10 font-bold">취소/교환/반품 페이지</h2>
      <OrderFilterButton onFilterChange={(type) => {
          setFilterType(type);
          setPage(0); // 필터 바뀔 땐 페이지 0으로 초기화
        }}
        activeType={filterType}
      />

      {loading ? (
        <p className="text-center my-10 text-gray-500">불러오는 중...</p>
      ) : (
        <>
          <OrderChangeContent list={changeList} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
      <MypageMenu/>
      <MainFooter />
    </div>
  );
};

export default MyOrderChangeHistoryPage;