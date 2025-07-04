import kakaoLoginImg from "../../../assets/Kakao/ko/kakao_login_large_narrow.png";
import naverLoginImg from "../../../assets/Naver/2021_Login_with_naver_guidelines_Kr/btnD_아이콘원형.png";
import googleLoginImg from "../../../assets/Google/signin-assets/Web (mobile + desktop)/png@1x/dark/web_dark_rd_na@1x.png";
import LoginForm from "../../../features/common/oauth/LoginForm";
import axios from "axios";
const LoginPage = () => {
    
    const onLogin = async (userId, password) => {
        try{
            const response = await axios.post("http://localhost:8080/api/login", {userId, password});
            console.log("쇼핑몰에 오신걸 환영합니다.", response.data);
        } catch (e) {
            console.e("ID 또는 비밀번호를 확인해주세요", e.response?.data || e.message);
        }
    }

    return(
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <LoginForm onLogin={onLogin}/>
            <div className="flex justify-center gap-6 mt-3 items-center">
                <a href="http://localhost:8080/login/oauth2/code/kakao">
                    <img src={kakaoLoginImg} alt="카카오 로그인" className="w-12 h-12 object-cover rounded-full shadow-md"/>
                </a>
                <a href="http://localhost:8080/login/oauth2/code/google">
                    <img src={googleLoginImg} alt="구글 로그인" className="w-12 h-12 object-cover rounded-full shadow-md"/>
                </a>
                <a href="http://localhost:8080/login/oauth2/code/naver">
                    <img src={naverLoginImg} alt="네이버 로그인" className="w-12 h-12 object-cover rounded-full shadow-md"/>
                </a>
            </div>
        </div>
    );
};

export default LoginPage