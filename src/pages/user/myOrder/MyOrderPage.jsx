import { useEffect ,useState } from "react";
import MainHeader from "../../../features/common/Header/MainHeader";
import Footer from "../../../component/common/Footer";

import MyOrderSearch from "../../../component/user/myOrder/MyOrderSearch";
import MyOrderCalendar from "../../../component/user/myOrder/MyOrderCalender";
import MypageMenu from "../../../component/user/myOrder/MypageMenu";
import MyOrderContent from "../../../component/user/myOrder/MyOrderContent";

import { fetchMyOrderList } from "../../../api/user/myOrder/MyOrderApi";

const MyOrderPage = () => {
  // 오늘 날짜 (시작일)
  const today = new Date();

  const oneYearAgo = new Date();
  // 1년전 날짜 설정
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // 초기값 지정
  const [startDate, setStartDate] = useState(oneYearAgo);
  const [endDate, setEndDate] = useState(today);
  const [keyword, setKeyword] = useState("");
  const [orders, setOrders] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  const memberId = 1; // 실제 로그인 사용자 ID로 대체 필요

  const loadOrders = async (page = 0) => {
  try {
    const formattedStartDate = startDate?.toISOString().slice(0, 10);
    const formattedEndDate = endDate?.toISOString().slice(0, 10);

    const res = await fetchMyOrderList(
      memberId,
      page,
      5,
      formattedStartDate,
      formattedEndDate,
      keyword
    );

    setOrders(res.content || []);
    setTotalPages(res.totalPages);
    setCurrentPage(res.number);
  } catch (error) {
    console.log("주문 조회 실패", error);
  }
};

  useEffect(() => {
    loadOrders(0); //
  }, []);


  const handleSearch = () => {
  loadOrders(0); // 첫 페이지부터 검색
};
 
  return (
    <div>
      <MainHeader />
      <MyOrderCalendar
        startDate={startDate}
        endDate={endDate}
        onStartChange={setStartDate}
        onEndChange={setEndDate}
        onSearch={handleSearch}
      />
      <MyOrderSearch keyword={keyword} setKeyword={setKeyword} onSearch={loadOrders} />
      <MyOrderContent orders={orders} memberId={memberId} />
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mb-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => loadOrders(index)}
              className={`px-3 py-1 rounded-md ${
                currentPage === index ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      <MypageMenu />
      <Footer />
    </div>
  );
};

export default MyOrderPage;
