import { useContext } from "react";
import { UserContext } from "../../../component/common/Context/UserContext";
import LinkedButton from "../../../component/common/Link/LinkedButton";
import MainHeader from "../../../features/common/Header/MainHeader";
import MainFooter from "../../../features/common/Footer/MainFooter";
import { Navigate } from "react-router-dom";

const MyPage = () => {
    const { user } = useContext(UserContext);
    const id = user.id;

    if (!user) return <Navigate to="/login" replace />;
    
    return (
        <div>
            <MainHeader />
            <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-8 lg:px-20">
                <h1 className="text-xl font-semibold mb-6">{user.nickname}님의 마이페이지</h1>
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow divide-y">
                        <LinkedButton to={`/cart/${id}`} label="주문목록 / 배송조회" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to="#" label="반품 / 교환" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to="#" label="결제수단 관리" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to={`/order/${id}`} label="영수증 조회" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                    </div>
                    <div className="bg-white rounded-xl shadow divide-y">
                        <LinkedButton to="/mypage/reviews" label="리뷰" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to="/wishlist" label="찜 리스트" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to="#" label="정기구독" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                    </div>
                    <div className="bg-white rounded-xl shadow divide-y">
                        <LinkedButton to="/mypage/update" label="개인정보 확인/변경" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to="#" label="배송지 관리" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                    </div>
                    <div className="bg-white rounded-xl shadow divide-y">
                        {/* 미구현 FAQ 만 존재 */}
                        <LinkedButton to="#" label="문의" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                        <LinkedButton to="#" label="할인쿠폰" className="px-4 py-4 hover:bg-gray-50 block text-sm" />
                    </div>
                </div>
            </div>
            <MainFooter />
        </div>
  );
};
export default MyPage;