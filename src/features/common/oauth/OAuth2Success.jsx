import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuth2Success = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("accessToken");
    if (token) {
      localStorage.setItem("accessToken", token);
      alert("로그인 성공");
      navigate("/");
    } else {
      alert("토큰 없음");
      navigate("/login");
    }
  }, []);

  return <div>로그인 중입니다...</div>;
};

export default OAuth2Success;