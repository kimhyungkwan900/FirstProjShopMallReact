import { useState } from "react"

const AdminLayout = ({children})=>{

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = ()=>{
        setIsOpen(!isOpen);
    };

    const bgColor = isOpen? "bg-gray-900":"bg-gray-600";

    return(
        <>
            <nav id="adminNavBar" className="flex bg-gray-600">
                <div id="adminProfile" className="bg-gray-400">
                    프로필 내용과 로그아웃 버튼 넣기
                </div>
                <div id="manageList">
                    <div onClick={handleToggle} className={`${bgColor}`}>
                        {isOpen && (
                            <ul className="text-white font-bold">
                                <li className="pr-2 text-2xl">
                                    <Link to="">상품 등록</Link>
                                </li>
                                <li className="pr-2 text-2xl">
                                    <Link to="">상품 조회</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
            <main className="">
                {children}
            </main>
        </>
    );
};
export default AdminLayout;