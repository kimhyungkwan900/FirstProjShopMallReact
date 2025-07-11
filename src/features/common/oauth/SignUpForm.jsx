import { useState } from "react"

const SignUpForm = ({onSignUp}) => {
    const [form, setForm] = useState({
        userId: "",
        userPassword: "",
        email: "",
        phoneNumber: "",
    });

    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSignUp?.(form);
    };

    const isFormValid = () => {
      const { userId, userPassword, email, phoneNumber } = form;
      const idValid = /^[a-zA-Z0-9_]{6,16}$/.test(userId);
      const pwValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(userPassword);
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 40;
      const phoneValid = /^01\d{8,9}$/.test(phoneNumber);
      return idValid && pwValid && emailValid && phoneValid;
    };

    return(
      <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-center mb-6">회원가입</h2>
        <form onSubmit={onSubmit} noValidate>
          <input
            name="userId" placeholder="ID (6~16자, 영문/숫자)" value={form.userId} onChange={onChange} minLength={6} maxLength={16} pattern="^[a-zA-Z0-9_]{6,16}$" title="ID는 영문자, 숫자, 언더바(_)로 구성된 6~20자여야 합니다." 
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
          <input
            type="password" name="userPassword" placeholder="비밀번호는 8~20자 사이숫자와 영어를 사용해야 합니다" value={form.userPassword} onChange={onChange} minLength={8} maxLength={20} title="비밀번호는 8~20자 사이숫자와 영어를 사용해야 합니다."
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
          <input
            type="email" name="email" placeholder="이메일 주소 입력" value={form.email} onChange={onChange} maxLength={40} title="이메일 형식이어야 하며, 40자 이하여야 합니다."
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
          <input
            type="tel" name="phoneNumber" placeholder="전화번호 (예: 01012345678)" value={form.phoneNumber}
            onChange={onChange} maxLength={15} pattern="^01\d{8,9}$" title="전화번호 형식: 01012345678 (최대 15자)"
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-2 rounded-md transition text-white 
              ${isFormValid() ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`
              }>
            회원가입
          </button>
        </form>
      </div>
    );
};

export default SignUpForm;