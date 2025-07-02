import kakaoLoginImg from "../../../assets/Kakao/ko/kakao_login_medium_narrow.png"

const LoginPage = () => {

    return(
        <div>
            <h1>로그인페이지</h1>
            <a href="http://localhost:8080/login/oauth2/code/kakao">
                <img src={kakaoLoginImg} alt="" />
            </a>
        </div>
    )
}

export default LoginPage