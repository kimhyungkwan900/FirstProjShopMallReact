import { useState } from "react"
import { Link } from "react-router-dom";

const LoginForm = ({onLogin}) => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const onLoginSub = async (e) => {
        e.preventDefault();

        onLogin?.(userId,password);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-center mb-4">로그인</h2>
            <form onSubmit={onLoginSub}>
                <input type="text" className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="ID 입력" value={userId} onChange={(e) => setUserId(e.target.value)} required/>
                <input type="password" className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Password 입력" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit"
                    className="w-full bg-blue-500 text-white py-2 mt-1 rounded-md hover:bg-blue-600 transition flex items-center justify-center">
                    로그인
                </button>
                <hr className="my-2"/>
                <Link to="/signup" className="block w-full text-center border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center">
                    회원가입
                </Link>
            </form>
        </div>
    );
};

export default LoginForm;