import axios from "axios";
import LinkedButton from "../../../component/common/Link/LinkedButton";
import SearchBar from "../../../component/user/product/SearchBar";
import { useNavigate } from "react-router-dom";

const MainHeader = () => {

    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('accessToken');

    const onLogout = async() => {
        try {
            await axios.post("http://localhost:8080/api/members/logout",{},{
                withCredentials: true
            });
            localStorage.removeItem('accessToken')
            alert("로그아웃 되었습니다.")
            navigate("/")
        } catch (error) {
            console.error(error);
            alert("로그아웃 실패")
        }
    };

    return(
        <div>
            <header className="w-full bg-neutral-900 text-white px-6 py-2 text-sm">
                <nav className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <LinkedButton to="/brands" label="브랜드" />
                        <LinkedButton to="/categories" label="카테고리" />
                    </div>
                    {isLoggedIn ? (
                    <div className="flex space-x-4">
                        <LinkedButton to="/me" label="마이 페이지" />
                        <LinkedButton to="/cart" label="장바구니" />
                        <button onClick={onLogout} className="text-sm font-medium px-3 py-2 hover:text-blue-500 transition">로그아웃</button>
                    </div> 
                    ) : (
                        <div className="flex space-x-4">
                            <LinkedButton to="/login" label="로그인" />
                            <LinkedButton to="/signup" label="회원가입" />
                        </div>
                    )}
                </nav>
                <div className="flex mt-3">
                    <div className="ml-auto text-black">
                        <SearchBar />
                    </div>
                </div>
            </header>
        </div>
    )
}

export default MainHeader;  