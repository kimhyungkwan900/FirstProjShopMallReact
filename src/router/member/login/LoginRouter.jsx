//페이지 임포트
import OAuth2Error from "../../../features/common/oauth/OAuth2Error";
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
  },
  {
    path: '/oauth2/error',
    element: <OAuth2Error />
  }
];

export default LoginRouter;