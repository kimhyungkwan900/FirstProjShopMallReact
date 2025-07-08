import { useEffect, useState } from "react";
import MainHeader from "../../../features/common/Header/MainHeader";
import Footer from "../../../component/common/Footer";

import MyOrderSearch from "../../../component/user/myOrder/MyOrderSearch";
import MyOrderCalendar from "../../../component/user/myOrder/MyOrderCalender";
import MypageMenu from "../../../component/user/myOrder/MypageMenu";
import MyOrderContent from "../../../component/user/myOrder/MyOrderContent";

import { fetchMyOrderList } from "../../../api/user/myOrder/MyOrderApi";

const MyOrderPage = () => {
  const [startDate, setStartDate] = useState(new Date("2024-07-08"));
  const [endDate, setEndDate] = useState(new Date("2025-07-08"));
  const [keyword, setKeyword] = useState("");
  const [orders, setOrders] = useState([]);

  const memberId = 1; // 실제 로그인 사용자 ID로 대체 필요

  const loadOrders = async () => {
     try {
    const res = await fetchMyOrderList(memberId, 0, 20, startDate, endDate, keyword);
    console.log("API 응답 res:", startDate, endDate, keyword);
    setOrders(res.content || []);  // content가 없으면 빈 배열로 처리
  } catch (e) {
    console.error("주문 조회 실패", e);
  }
};

  useEffect(() => {
    loadOrders();
  }, [startDate, endDate, keyword]);

  return (
    <div>
      <MainHeader />
      <MyOrderCalendar
        startDate={startDate}
        endDate={endDate}
        onStartChange={setStartDate}
        onEndChange={setEndDate}/>
      <MyOrderSearch keyword={keyword} setKeyword={setKeyword} />
      <MyOrderContent orders={orders} />
      <MypageMenu />
      <Footer />
    </div>
  );
};

export default MyOrderPage;