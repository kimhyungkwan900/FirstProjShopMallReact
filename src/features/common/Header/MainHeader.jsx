import axios from "axios";
import LinkedButton from "../../../component/common/Link/LinkedButton";
import MainSearchBar from "../../../component/user/MainPage/MainSearchBar";
import { useContext } from "react";
import { UserContext } from "../../../component/common/Context/UserContext";
import { useCsrfToken } from "../../../hooks/common/useCsrfToken";

const MainHeader = () => {
  const {user} = useContext(UserContext);
  const isLoggedIn = !!user?.userId;
  const csrfToken = useCsrfToken();

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

  return (
    <header className="w-full bg-neutral-900 text-white shadow-md sticky top-0 z-50">
      {/* 상단 네비게이션 */}
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex justify-between items-center text-sm">

        {/* 좌측: 메뉴 */}
        <div className="flex items-center gap-4">
          <LinkedButton to="/brands" label="브랜드" />
          <LinkedButton to="/categories" label="카테고리" />
        </div>

        {/* 중앙: 로고 */}
        <div>
          <LinkedButton
            to="/"
            label="INITIUM"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight hover:text-blue-400 transition"
          />
        </div>

        {/* 우측: 사용자 영역 */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <LinkedButton to="/mypage" label="마이페이지" />
              <LinkedButton to="/cart" label="장바구니" />
              <LinkedButton to="/faq" label="고객지원" />
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