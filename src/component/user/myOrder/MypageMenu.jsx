import { useNavigate } from "react-router-dom";

const MypageMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-20 left-4 w-52 p-4 border rounded-xl shadow-md mt-10 bg-white z-50">
      <h1 className="text-center text-lg font-semibold mb-4 text-gray-800">📋 마이페이지</h1>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => navigate("/mypage/reviews")}
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          나의 리뷰
        </button>
        <button
          onClick={() => navigate("/mypage/orders")}
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          나의 주문
        </button>
        <button
          onClick={() => navigate("/admin/review")}
          className="py-2 px-4 bg-fuchsia-400 text-white rounded-md hover:bg-green-600 transition"
        >
          관리자 주문
        </button>
      </div>
    </div>
  );
};

export default MypageMenu;
