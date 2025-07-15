import { useContext } from "react";
import { UserContext } from "../../../component/common/Context/UserContext";
import LinkedButton from "../../../component/common/Link/LinkedButton";
import MainHeader from "../../../features/common/Header/MainHeader";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../../component/common/Footer";

const MyPage = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    if (!user) return <Navigate to="/login" replace />;
    
    const onDeactivate = async () => {
        const confirmed = window.confirm("정말 탈퇴하시겠습니까?");
        if (!confirmed) return;

        try {
                await axios.post(
                    "http://localhost:8080/api/auth/deactivate",
                    {},
                    { withCredentials: true }
            );

            alert("회원 탈퇴가 완료되었습니다.");
            setUser(null);        
            localStorage.removeItem('userId');
            localStorage.removeItem('role');
            navigate("/");
        } catch (err) {
            const message = err?.response?.data || "탈퇴 처리 중 오류가 발생했습니다.";
            alert(message);
        }
    };

    return (
        <div>
            <MainHeader />
            <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-8 lg:px-20">
                <h1 className="text-xl font-semibold mb-6">{user.nickname}님의 마이페이지</h1>
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow divide-y">
                        <LinkedButton to="/mypage/orders" label="주문목록 / 배송조회" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to="/mypage/orderChangeHistory" label="취소 / 반품 / 교환" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to="#" label="결제수단 관리" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to="/order" label="영수증 조회" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                    </div>
                    <div className="bg-white rounded-xl shadow divide-y">
                        <LinkedButton to="/mypage/reviews" label="리뷰" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to="/wishlist" label="찜 리스트" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to="#" label="정기구독" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                    </div>
                    <div className="bg-white rounded-xl shadow divide-y">
                        <LinkedButton to="/mypage/update" label="개인정보 확인/변경" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to="/mypage/address" label="배송지 관리" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                    </div>
                    <div className="bg-white rounded-xl shadow divide-y">
                        {/* 미구현 FAQ 만 존재 */}
                        <LinkedButton to="/faq" label="문의" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                    </div>
                        <div className="bg-white rounded-xl shadow px-4 py-6">
                            <button
                                onClick={onDeactivate}
                                className="w-full text-red-600 hover:text-white border border-red-600 hover:bg-red-600 font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm">
                                회원 탈퇴
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
        </div>
  );
};
export default MyPage;