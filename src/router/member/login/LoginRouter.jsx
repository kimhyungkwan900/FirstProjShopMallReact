//페이지 임포트
import OAuth2Success from "../../../features/common/oauth/Oauth2Success";
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
  },
  {
    path: '/oauth2/success',
    element: <OAuth2Success />
  }
];

export default LoginRouter;