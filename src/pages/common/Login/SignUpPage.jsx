import axios from "axios";
import SignUpForm from "../../../features/common/oauth/SignUpForm";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

    const navigate = useNavigate();

    const onSignUp = async (form) =>{
        try {
            const response = await axios.post("http://localhost:8080/api/members/signup",form);
            console.log(response.data);
            alert("회원가입에 성공했습니다.")
            navigate("/login")
        } catch (e) {
            console.error(e.response?.data || e.message);
            alert("회원가입에 실패했습니다.")
        }
    }

    return(
        <div>
            <SignUpForm onSignUp={onSignUp}/>
        </div>
    )
};

export default SignUpPage;