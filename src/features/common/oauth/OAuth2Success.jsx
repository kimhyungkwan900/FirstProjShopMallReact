import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuth2Success = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = params.get("userId");
    const role = params.get("role");

    if (userId && role) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      alert("로그인 성공");
      navigate("/");
    } else {
      alert("로그인 정보 없음");
      navigate("/login");
    }
  }, []);


  return <div>로그인 중입니다...</div>;
};

export default OAuth2Success;