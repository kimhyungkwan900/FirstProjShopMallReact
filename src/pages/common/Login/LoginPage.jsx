import kakaoLoginImg from "../../../assets/Kakao/ko/kakao_login_large_narrow.png";
import naverLoginImg from "../../../assets/Naver/2021_Login_with_naver_guidelines_Kr/btnD_아이콘원형.png";
import googleLoginImg from "../../../assets/Google/signin-assets/Web (mobile + desktop)/png@1x/dark/web_dark_rd_na@1x.png";
import LoginForm from "../../../features/common/oauth/LoginForm";
import axios from "axios";
const LoginPage = () => {

    const onLogin = async (userId, password) => {
        try {
            const response = await axios.post(
            "/api/auth/login",
            { userId, password },
            {
                withCredentials: true,
                validateStatus: (status) => status >= 200 && status < 300,
            }
        );

        const { userId: responseUserId, role } = response.data;

        if (!responseUserId || !role) {
            throw new Error("서버에서 사용자 정보를 받지 못했습니다.");
        }

        localStorage.setItem("userId", responseUserId);
        localStorage.setItem("role", role);

        alert("쇼핑몰에 오신 걸 환영합니다!");
        window.location.replace("/");
        } catch (e) {
            console.error(e);

            const status = e.response?.status;
            const message = e.response?.data || "로그인 중 알 수 없는 오류가 발생했습니다.";

            if (status === 403) {
                alert("비활성화된 계정입니다. 관리자에게 문의하세요.");
            } else if (status === 401) {
                alert("비밀번호가 틀렸습니다.");
            } else if (status === 404) {
                alert("존재하지 않는 사용자입니다.");
            } else {
                alert(message);
            }
        }
    };


    return(
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <LoginForm onLogin={onLogin}/>
            <div className="flex justify-center gap-6 mt-3 items-center">
                <a href="http://localhost:8080/oauth2/authorization/kakao">
                    <img src={kakaoLoginImg} alt="카카오 로그인" className="w-12 h-12 object-cover rounded-full shadow-md"/>
                </a>
                <a href="http://localhost:8080/oauth2/authorization/google">
                    <img src={googleLoginImg} alt="구글 로그인" className="w-12 h-12 object-cover rounded-full shadow-md"/>
                </a>
                <a href="http://localhost:8080/oauth2/authorization/naver">
                    <img src={naverLoginImg} alt="네이버 로그인" className="w-12 h-12 object-cover rounded-full shadow-md"/>
                </a>
            </div>
        </div>
    );
};

export default LoginPage