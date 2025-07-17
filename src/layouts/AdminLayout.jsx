import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom";
import { useCsrfToken } from "../hooks/common/useCsrfToken";
import Footer from '../component/common/Footer'

const AdminLayout = ({children})=>{
    const csrfToken = useCsrfToken();

    //상품관리 토글
    const [productListOpen, setproductListOpen] = useState(false);

    const productToggle = ()=>{
        setproductListOpen(!productListOpen);
    };
    const productBgColor = productListOpen? "bg-gray-600":"bg-gray-800";

    //주문관리 토글
    const [orderListOpen, setorderListOpen] = useState(false);

    const orderToggle = ()=>{
        setorderListOpen(!orderListOpen);
    };
    const orderBgColor = orderListOpen? "bg-gray-600":"bg-gray-800";

    //로그아웃
  const onLogout = async () => {
        try {
        await axios.post("/api/auth/logout", {}, { withCredentials: true,
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                  },
        });

        localStorage.removeItem('userId');
        localStorage.removeItem('role');

        alert("로그아웃 되었습니다.");
        window.location.replace("/");
        } catch (error) {
        console.error("로그아웃 실패:", error);
        alert("로그아웃 실패");
        }
    };

    return(
        <div className="flex flex-col min-h-screen">
            <header className="w-full bg-neutral-900 text-white shadow-md ">
                <div className="max-w-screen-xl mx-auto px-6 py-3 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                    </div>
                    <div>
                        <Link to="/" className="text-2xl sm:text-3xl font-extrabold tracking-tight hover:text-blue-400 transition">INITIUM</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onLogout}
                            className="text-sm font-medium px-3 py-2 hover:text-blue-400 transition"
                        >
                        로그아웃
                        </button>
                    </div>
                </div>
            </header>
            <div className="flex">
                <nav className="w-50 text-center bg-gray-800">
                    <div className="flex flex-col">
                        <button onClick={productToggle} className={`h-12 leading-[3rem] text-white font-bold select-none cursor-pointer ${productBgColor}`}>
                            상품 관리
                        </button>
                        {productListOpen && (
                            <ul className="text-white font-light bg-gray-600">
                                <hr/>
                                <li className="pt-2 pb-2">
                                    <Link to="/admin/products/add" >상품 등록</Link>
                                </li>
                                <hr/>
                                <li className="pt-2 pb-2">
                                    <Link to="/admin/products">상품 조회</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className="bg-white h-0.5">&nbsp;</div>
                    <div className="flex flex-col">
                        <button onClick={orderToggle} className={`h-12 leading-[3rem] text-white font-bold select-none cursor-pointer ${orderBgColor}`}>
                            주문 관리
                        </button>
                        {orderListOpen && (
                            <ul className="text-white font-light bg-gray-600">
                                <hr/>
                                <li className="pt-2 pb-2">
                                    <Link to="/admin/orders">주문 조회</Link>
                                </li>
                                <hr/>
                                <li className="pt-2 pb-2">
                                    <Link to="/admin/claims">고객 요청 조회</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className="bg-white h-0.5">&nbsp;</div>
                    <div className="h-12 leading-[3rem] text-white font-bold select-none cursor-pointer">
                        <Link to="/admin/review">리뷰 관리</Link>
                    </div>
                    <div className="bg-white h-0.5">&nbsp;</div>
                    <div className="h-12 leading-[3rem] text-white font-bold select-none cursor-pointer">
                        <Link to="/admin/faq">FAQ</Link>
                    </div>
                </nav>
                <main className="flex-1 bg-white min-h-screen">  
                    {children}
                </main>
            </div>
            <Footer/>
        </div>
    );
};
export default AdminLayout;