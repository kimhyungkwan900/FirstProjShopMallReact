import { useState } from "react"
import { Link } from "react-router-dom";

const AdminLayout = ({children})=>{

    //상품관리 토글
    const [productListOpen, setproductListOpen] = useState(false);

    const productToggle = ()=>{
        setproductListOpen(!productListOpen);
    };
    const productBgColor = productListOpen? "bg-gray-900":"bg-gray-600";

    //주문관리 토글
    const [orderListOpen, setorderListOpen] = useState(false);

    const orderToggle = ()=>{
        setorderListOpen(!orderListOpen);
    };
    const orderBgColor = orderListOpen? "bg-gray-900":"bg-gray-600";

    return(
        <div className="flex h-screen">
            <nav id="adminNavBar" className="w-45 flex flex-col bg-gray-600">
                <div id="adminProfile" className="bg-gray-400">
                    프로필 내용과 로그아웃 버튼 넣기
                </div>
                <div id="manageList">
                    <div onClick={productToggle} className={`text-white font-bold select-none cursor-pointer ${productBgColor}`}>
                        상품 관리
                        {productListOpen && (
                            <ul className="text-white font-light bg-gray-600">
                                <li className="pr-2 text-2xl">
                                    <Link to="/admin/products/add">상품 등록</Link>
                                </li>
                                <li className="pr-2 text-2xl">
                                    <Link to="/admin/products">상품 조회</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                        <div onClick={orderToggle} className={`text-white font-bold select-none cursor-pointer ${orderBgColor}`}>
                        주문 관리
                        {orderListOpen && (
                            <ul className="text-white font-light bg-gray-600">
                                <li className="pr-2 text-2xl">
                                    <Link to="">주문 조회</Link>
                                </li>
                                <li className="pr-2 text-2xl">
                                    <Link to="">고객 요청 조회</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
            {/* 임시로 배경색 지정 */}
            <main className="flex-1 bg-white">  
                {children}
            </main>
        </div>
    );
};
export default AdminLayout;