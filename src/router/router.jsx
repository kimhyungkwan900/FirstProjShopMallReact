import { createBrowserRouter } from 'react-router-dom';
import productRoutes from './user/product/ProductRoutes';
import loginRoutes from './member/login/LoginRouter';
import NotFoundPage from '../pages/user/product/NotFoundPage';
import MainPage from '../pages/MainPage';
import ReviewRouter from './user/review/ReviewRouter';
import productManageRoutes from './admin/productmanage/ProductManageRoutes';
import orderManageRoutes from './admin/ordermanage/OrderManageRoutes';
import myPageRouter from './member/mypage/myPageRouter';
import CartRouter from './cart/CartRouter';
import OrderRouter from './order/OrderRouter';
import FaqRouter from './admin/faq/FaqRouter';
import UserFaqRouter from "./user/userFaq/UserFaqRouter";
import OrderSuccessRouter from './order/OrderSuccessRouter';
import RestockAlarmRouter from './cart/RestockAlarmRouter';

const router = createBrowserRouter([
  ...loginRoutes,
  ...orderManageRoutes,
  ...productManageRoutes,
  ...productRoutes,
  ...ReviewRouter,
  ...myPageRouter,
  ...CartRouter,
  ...OrderRouter,
  ...FaqRouter,
  ...UserFaqRouter,
  ...OrderSuccessRouter,
  ...RestockAlarmRouter,

  {
    path: '/',
    element: <MainPage  />
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router