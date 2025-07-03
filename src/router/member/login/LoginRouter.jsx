//페이지 임포트
import LoginPage from "../../../pages/common/Login/LoginPage";
import SignUpPage from "../../../pages/common/Login/SignUpPage";

const LoginRouter = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignUpPage />
  }
];

export default LoginRouter;