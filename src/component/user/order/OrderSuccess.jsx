import { useNavigate } from "react-router-dom";

/**
 * 주문 완료 페이지
 * - 주문이 성공적으로 완료되었음을 사용자에게 안내
 * - 홈 이동 및 주문 내역 페이지로 이동 버튼 제공
 */
const OrderSuccess = () => {
  const navigate = useNavigate();

  // 홈으로 이동
  const handleToHome = () => {
    navigate("/");
  };

  // 마이페이지 > 주문 내역으로 이동
  const handleToMypage = () => {
    navigate("/mypage/orders");
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">✅ 주문이 완료되었습니다</h1>

      {/* 이동 버튼 영역 */}
      <div className="flex gap-4">
        <button
          onClick={handleToHome} // 홈으로 이동
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          홈으로
        </button>
        <button
          onClick={handleToMypage} // 주문 내역 페이지로 이동
          className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
        >
          주문 페이지
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
