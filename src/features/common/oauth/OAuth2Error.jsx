import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OAuth2Error = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const error = new URLSearchParams(location.search).get("error");

  useEffect(() => {
    if (error === "oauth_failed") {
      alert("소셜 로그인에 실패했습니다. 다시 시도해주세요.");
      navigate("/login");
    }
  }, [error, navigate]);

  return null;
};

export default OAuth2Error;