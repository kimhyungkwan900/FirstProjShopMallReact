import { useState } from "react"

const SignUpForm = ({onSignUp}) => {
    const [form, setForm] = useState({
        user_id: "",
        user_password: "",
        email: "",
        phone_number: "",
    });

    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSignUp?.(form);
    };

    return(
<div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
  <h2 className="text-xl font-semibold text-center mb-6">회원가입</h2>
  <form onSubmit={onSubmit} noValidate>
    
    <input
      name="user_id" placeholder="ID (6~20자, 영문/숫자/_)" value={form.user_id} onChange={onChange} minLength={6} maxLength={20} pattern="^[a-zA-Z0-9_]{6,20}$" title="ID는 영문자, 숫자, 언더바(_)로 구성된 6~20자여야 합니다." 
      className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required
    />

    <input
      type="password" name="user_password" placeholder="비밀번호 (6~20자)" value={form.user_password} onChange={onChange} minLength={6} maxLength={20} title="비밀번호는 6~20자 사이여야 합니다."
      className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required
    />

    <input
      type="email" name="email" placeholder="이메일 주소 입력" value={form.email} onChange={onChange} maxLength={40} title="이메일 형식이어야 하며, 40자 이하여야 합니다."
      className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required
    />

    <input
      type="tel" name="phone_number" placeholder="전화번호 (예: 010-1234-5678)" value={form.phone_number}
      onChange={onChange} maxLength={15} pattern="^01[0-9]-\d{3,4}-\d{4}$" title="전화번호 형식: 010-1234-5678 (최대 15자)"
      className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required
    />

    <button
      type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
    >
      회원가입
    </button>
  </form>
</div>

    );
};

export default SignUpForm;