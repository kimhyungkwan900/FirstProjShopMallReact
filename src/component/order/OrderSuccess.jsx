import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleToHome = () => {
    navigate("/");
  };

  const handleToMypage = () => {
    navigate("/mypage/orders");
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">✅ 주문이 완료되었습니다</h1>
      <div className="flex gap-4">
        <button
          onClick={handleToHome}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          홈으로
        </button>
        <button
          onClick={handleToMypage}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
        >
          주문 페이지
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
