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
            <form onSubmit={onSubmit}>
                <input name="user_id" placeholder="ID" value={form.user_id} onChange={onChange}
                    className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
                <input type="password" name="user_password" placeholder="PW" value={form.user_password} onChange={onChange}
                    className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
                <input name="email" type="email" placeholder="이메일 입력" value={form.email} onChange={onChange}
                    className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
                <input type="tel" name="phone_number" placeholder="전화번호 입력" value={form.phone_number} onChange={onChange}
                    className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">회원가입</button>
            </form>
        </div>
    );
};

export default SignUpForm;