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
            <nav id="adminNavBar" className="w-50 flex flex-col text-center bg-gray-600">
                {/* <div id="manageList"> */}
                    <div onClick={productToggle} className={`h-12 leading-[3rem] text-white font-bold select-none cursor-pointer ${productBgColor}`}>
                        상품 관리
                        {productListOpen && (
                            <ul className="text-white font-light bg-gray-600">
                                <li className="pr-2 text-2xl">
                                    <Link to="/admin/products/add" className="block w-full p-4 hover:bg-gray-100">상품 등록</Link>
                                </li>
                                <li className="pr-2 text-2xl">
                                    <Link to="/admin/products">상품 조회</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div onClick={orderToggle} className={`h-12 leading-[3rem] text-white font-bold select-none cursor-pointer ${orderBgColor}`}>
                        주문 관리
                        {orderListOpen && (
                            <ul className="text-white font-light bg-gray-600">
                                <li className="pr-2 text-2xl">
                                    <Link to="/admin/orders">주문 조회</Link>
                                </li>
                                <li className="pr-2 text-2xl">
                                    <Link to="/admin/claims">고객 요청 조회</Link>
                                </li>
                            </ul>
                        )}
                    </div>

                     <div>
                        <ul className="text-white font-bold ">
                            <li className="pr-2 text-lxl">
                                <Link to="/admin/review">리뷰 관리</Link>
                            </li>
                        </ul>
                    </div>

                    
                    <div>
                        <ul className="text-white font-light bg-gray-600">
                            <li className="pr-2 text-1xl">
                                <Link to="/admin/faq">FAQ</Link>
                            {/* </li> */}
                        {/* </ul> */}
                    </div>
                {/* </div> */}
            </nav>
            {/* 임시로 배경색 지정 */}
            <main className="flex-1 bg-white">  
                {children}
            </main>
        </div>
    );
};
export default AdminLayout;