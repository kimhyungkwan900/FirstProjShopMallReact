import { createBrowserRouter } from 'react-router-dom';
import productRoutes from './user/product/ProductRoutes';
import loginRoutes from './member/login/LoginRouter';
import NotFoundPage from '../pages/user/product/NotFoundPage';
import MainPage from '../pages/MainPage';
import ReviewRouter from './user/review/ReviewRouter';
import productManageRoutes from './admin/productmanage/ProductManageRoutes';
import orderManageRoutes from './admin/ordermanage/OrderManageRoutes';
import myPageRouter from './member/mypage/myPageRouter';

const router = createBrowserRouter([
  ...loginRoutes,
  ...orderManageRoutes,
  ...productManageRoutes,
  ...productRoutes,
  ...ReviewRouter,
  ...myPageRouter,
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