import { useEffect, useState } from "react";
import { getRestockAlarmList, cancelRestockAlarm } from "../../../api/user/cart/CartApi";
import MainHeader from "../../../features/common/Header/MainHeader";
import Footer from "../../../component/common/Footer";
import MyPageSideMenuBar from "../../../component/user/myOrder/MyPageSideMenuBar";
import { useNavigate } from "react-router-dom";
import { useCsrfToken } from "../../../hooks/common/useCsrfToken";

const RestockAlarmListPage = () => {
  const [restockAlarmList, setRestockAlarmList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const csrfToken = useCsrfToken();


  useEffect(() => {
    const fetchAlarm = async () => {
      try {
        const response = await getRestockAlarmList();
        const alarmData = response.data?.content ?? response.data ?? [];
        setRestockAlarmList(Array.isArray(alarmData) ? alarmData : []);
      } catch (error) {
        console.error("재입고 알림 목록 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlarm();
  }, []);

  const handleCancelAlarm = async (productId) => {
    try {
      await cancelRestockAlarm(productId, csrfToken);
      alert("알림이 해제되었습니다.");
      setRestockAlarmList((prev) => prev.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("알림 해제 실패", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">불러오는 중...</div>;
  }

  return (
    <div>
        <MainHeader/>
        <div className="max-w-[1200px] mx-auto mt-10 mb-30 h-100% p-4 bg-gray-100 ">
      <h1 className="text-xl font-bold mb-4 ">재입고 알림내역</h1>

      <div className="bg-white">
        <ul className="space-y-4 text-gray-800 pt-3 pl-3.5">
            <li className="text-sm text-gray-600">• 알림 신청 순서대로 발송됩니다.</li>
            <li className="text-sm text-gray-600">• 알림 신청 상품을 구매하거나, 60일이 지나면 자동 해제됩니다.</li>
            <li className="text-sm text-gray-600">• 인기 상품은 알림 후 조기 품절될 수 있습니다.</li>
            <li className="text-sm text-gray-600">• 알림 신청 당시의 상품 구성, 가격은 재입고 시 변경될 수 있습니다.</li>
        </ul>

        {restockAlarmList.length === 0 ? (
            <p className="text-center text-gray-500 mt-8 pb-8">재입고 알림 신청 내역이 없습니다.</p>
        ) : (
            <div className="mt-6 space-y-6">
            {restockAlarmList.map((alarm) => (
                <div
                key={alarm.productId}
                className="flex gap-4 p-4  bg-white shadow-sm"
                >
                <img
                    src={alarm.imageUrl}
                    alt={alarm.productName}
                    className="w-23 h-22 object-cover rounded-md"
                />
                <div className="flex-1 gap-2 mt-1.5">
                    <h2 className="font-semibold">{alarm.productBrandName}</h2>
                    <button
                        onClick={() => navigate(`/products/${alarm.productId}`)}
                        className="hover:underline text-[15px] mb-1">{alarm.productName}</button>
                    <p className="text-gray-500 text-sm ">알림 대기자 19명 / 2025.09.03 자동 해제</p>
                </div>
                <div className="flex flex-col justify-center">
                    <button
                    onClick={() => handleCancelAlarm(alarm.productId)}
                    className="border border-gray-400 rounded px-4 py-1 text-sm hover:bg-gray-100 transition"
                    >
                    알림 해제
                    </button>
                </div>
                </div>
                ))}
                </div>
            )}
        </div>
    </div>
    <MyPageSideMenuBar/>
    <Footer/>
    </div>
  );
};

export default RestockAlarmListPage;
