import axios from "axios";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {

    const onSignUp = async (form) =>{
        try {
            const response = await axios.post("http://localhost:8080/api/signup",{form});
            console.log("회원 가입에 성공했습니다.",response.data);
        } catch (e) {
            console.e("회원 가입 실패",e.response?.data || e.message);
        }
    }

    return(
        <div>
            <SignUpForm onSignUp={onSignUp}/>
        </div>
    )
};

export default SignUpPage;