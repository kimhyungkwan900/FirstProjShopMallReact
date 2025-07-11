import { useEffect ,useState } from "react";
import MainHeader from "../../../features/common/Header/MainHeader";
import Footer from "../../../component/common/Footer";
import { deleteOrder } from "../../../api/user/myOrder/MyOrderDeleteApi";

import MyOrderSearch from "../../../component/user/myOrder/MyOrderSearch";
import MyOrderCalendar from "../../../component/user/myOrder/MyOrderCalender";
import MypageMenu from "../../../component/user/myOrder/MypageMenu";
import MyOrderContent from "../../../component/user/myOrder/MyOrderContent";

import { fetchMyOrderList } from "../../../api/user/myOrder/MyOrderApi";

import { useContext } from "react";
import { UserContext } from "../../../component/common/Context/UserContext";

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

  // 페이지 네이션 
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  const {user} = useContext(UserContext);
  const memberId = user?.id;


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

const handleDeleteOrder = async (orderId) => {
  try {
    await deleteOrder(orderId); // 실제 API 호출

    const updatedOrders = orders.filter((order) => order.id !== orderId);

    if (updatedOrders.length === 0 && currentPage > 0) {
      await loadOrders(currentPage - 1);
      return;
    }
    
    let newOrders = [...updatedOrders];
    if (updatedOrders.length < 5 && currentPage + 1 < totalPages) {
      const formattedStartDate = startDate?.toISOString().slice(0, 10);
      const formattedEndDate = endDate?.toISOString().slice(0, 10);

      const nextRes = await fetchMyOrderList(
        memberId,
        currentPage + 1,
        5,
        formattedStartDate,
        formattedEndDate,
        keyword
      );
      if (nextRes.content && nextRes.content.length > 0) {
        newOrders.push(nextRes.content[0]); // 한 개만 보충
      }
    }
    setOrders(newOrders);
  } catch (error) {
    console.error("주문 삭제 실패", error);
  }
};
 
  return (
    <div>
      <MainHeader />
      <h2 className="text-2xl text-center mt-10 font-bold">MyOrder 주문 목록</h2>
      <MyOrderCalendar
        startDate={startDate}
        endDate={endDate}
        onStartChange={setStartDate}
        onEndChange={setEndDate}
        onSearch={handleSearch}
      />
      <MyOrderSearch keyword={keyword} setKeyword={setKeyword} onSearch={loadOrders} />
      <MyOrderContent 
        orders={orders} 
        memberId={memberId} 
        onDelete={handleDeleteOrder}/>


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
