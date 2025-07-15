import { useNavigate, useLocation } from "react-router-dom";

const MyPageSideMenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "주문목록 / 배송조회", path: "/mypage/orders" },
    { label: "취소 / 반품 / 교환", path: "/mypage/orderChangeHistory" },
    { label: "결제수단 관리", path: "#" },
    { label: "영수증 조회", path: "/order" },
    { label: "리뷰", path: "/mypage/reviews" },
    { label: "찜 리스트", path: "/wishlist" },
    { label: "재입고 알림 내역", path: "/restock/list" },
    { label: "정기구독", path: "#" },
    { label: "개인정보 확인 / 변경", path: "/mypage/update" },
    { label: "배송지 관리", path: "/mypage/address" },
    { label: "문의", path: "/faq" },
  ];

  return (
    <div className="fixed top-16 left-4 w-52 border rounded shadow-md mt-20 bg-white z-50">
      <h1 className="text-center text-lg font-semibold text-gray-800 border-b py-4">📋 마이페이지</h1>
      <div className="flex flex-col font-bold">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => item.path !== "#" && navigate(item.path)}
            className={`py-2 px-4 text-left transition ${
              location.pathname === item.path
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyPageSideMenuBar;