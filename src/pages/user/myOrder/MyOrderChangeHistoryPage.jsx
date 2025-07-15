import { useEffect, useState } from "react";
import OrderFilterButton from "../../../component/user/orderChangeHistory/OrderFilterButton";
import OrderChangeContent from "../../../component/user/orderChangeHistory/OrderChangeContent";
import Pagination from "../../../component/user/orderChangeHistory/Pagination";
import { findChangeList } from "../../../api/user/myOrder/MyOrderChangeHistoryApi";
import { useContext } from "react";
import { UserContext } from "../../../component/common/Context/UserContext";
import { deleteOrder } from "../../../api/user/myOrder/MyOrderDeleteApi";

import MainHeader from "../../../features/common/Header/MainHeader";
import Footer from "../../../component/common/Footer";

import MyPageSideMenuBar from "../../../component/user/myOrder/MyPageSideMenuBar";

const MyOrderChangeHistoryPage = () => {
  const [filterType, setFilterType] = useState("ALL");
  const [changeList, setChangeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  
 const {user} = useContext(UserContext);
 const memberId = user?.id;

 const returnTypeMap = {
  ALL: null,

  CANCEL: [
    "CANCEL_REQUEST",
    "CANCEL_COMPLETE",
    "CANCEL_REJECTED"
  ],
  EXCHANGE: [
    "EXCHANGE_REQUEST",
    "EXCHANGE_COMPLETE",
    "EXCHANGE_REJECTED"
  ],
  RETURN: [
    "RETURN_REQUEST",
    "RETURN_COMPLETE",
    "RETURN_REJECTED"
  ]
};

 const fetchData = async (pageNumber = 0, filter = filterType) => {
  setLoading(true);
  try {
    const returnTypes = returnTypeMap[filter]; // null or 배열
    const res = await findChangeList({
      memberId,
      returnType: returnTypes,
      page: pageNumber,
      size: 5,
    });

    const filtered = res.content?.filter(item => !item.orderDelete) || [];
    const totalValidItems = res.totalElements - res.content.filter(item => item.orderDelete).length;
    const totalPages = Math.ceil(totalValidItems / 5);

    setChangeList(filtered);
    setTotalPages(totalPages);

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


 const handleDeleteOrder = async (orderId) => {
  try {
    await deleteOrder(orderId);

    const returnTypes = returnTypeMap[filterType]; 
    const res = await findChangeList({
      memberId,
      returnType : returnTypes,
      page,
      size: 5,
    });

    const filtered = res.content?.filter(item => !item.orderDelete) || [];
    const totalItems = res.totalElements; // 서버 기준 전체 항목 (삭제 포함)
    const totalPages = Math.ceil(totalItems / 5);

    if (filtered.length === 0 && page > 0) {
      // 현재 페이지에 데이터가 없다면 이전 페이지로 이동
      await fetchData(page - 1, filterType);
    } else {
      setChangeList(filtered);
      setTotalPages(totalPages);
    }
  } catch (err) {
    console.error("삭제 실패", err);
  }
};

  return (
    <div>
      <MainHeader/>
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
          <OrderChangeContent list={changeList} onDelete={handleDeleteOrder} />
          {changeList.length > 0 && totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
      <MyPageSideMenuBar/>
      <Footer/>
    </div>
  );
};

export default MyOrderChangeHistoryPage;