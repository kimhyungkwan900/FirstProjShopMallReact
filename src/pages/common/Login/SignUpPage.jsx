import axios from "axios";
import SignUpForm from "../../../features/common/oauth/SignUpForm";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

    const navigate = useNavigate();

    const onSignUp = async (form) => {
    try {
        const response = await axios.post("http://localhost:8080/api/members/signup", form);

        // 200번대 응답인지 확인
        if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        alert("회원가입에 성공했습니다.");
        navigate("/login");
        } else {
        // 성공 범위(2xx)가 아닐 경우도 catch가 아닌 여기서 처리
        console.warn("비정상 응답:", response.status);
        alert("회원가입에 실패했습니다. (서버 응답 오류)");
        }

    } catch (e) {
        console.error(e.response?.data || e.message);
        alert("회원가입에 실패했습니다. (요청 오류)");
    }
    };

    return(
        <div>
            <SignUpForm onSignUp={onSignUp}/>
        </div>
    )
};

export default SignUpPage;