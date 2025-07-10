import axios from "axios";
import { useNavigate } from "react-router-dom";
import LinkedButton from "../../../component/common/Link/LinkedButton";
import MainSearchBar from "../../../component/user/MainPage/MainSearchBar";

const MainHeader = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const onLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem('accessToken');
      alert("로그아웃 되었습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("로그아웃 실패");
    }
  };

<<<<<<< HEAD
  return (
    <header className="w-full bg-neutral-900 text-white shadow-md sticky top-0 z-50">
      {/* 상단 네비게이션 */}
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex justify-between items-center text-sm">
        {/* 좌측: 메뉴 */}
        <div className="flex items-center gap-4">
          <LinkedButton to="/brands" label="브랜드" />
          <LinkedButton to="/categories" label="카테고리" />
=======
    const isLoggedIn = !!localStorage.getItem('accessToken');

    const onLogout = async() => {
        try {
            await axios.post("http://localhost:8080/api/auth/logout",{},{
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
                    <div className="flex space-x-4">
                        <LinkedButton to="/" label="FirstProjShopMall" className="text-4xl font-extrabold tracking-tight"/>
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
                        <MainSearchBar/>
                    </div>
                </div>
            </header>
>>>>>>> 7e6da87 (2025_07_07_2119)
        </div>

        {/* 중앙: 로고 */}
        <div>
          <LinkedButton
            to="/"
            label="FirstProjShopMall"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight hover:text-blue-400 transition"
          />
        </div>

        {/* 우측: 사용자 영역 */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <LinkedButton to="/mypage" label="마이페이지" />
              <LinkedButton to="/cart" label="장바구니" />
              <LinkedButton to="/" label="고객지원" />
              <button
                onClick={onLogout}
                className="text-sm font-medium px-3 py-2 hover:text-blue-400 transition"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <LinkedButton to="/login" label="로그인" />
              <LinkedButton to="/signup" label="회원가입" />
            </>
          )}
        </div>
      </div>

      {/* 하단 검색 바 */}
      <div className="bg-neutral-800 border-t border-neutral-700">
        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <MainSearchBar />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
