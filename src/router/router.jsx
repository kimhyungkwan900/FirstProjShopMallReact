import { createBrowserRouter } from 'react-router-dom';
import productRoutes from './user/product/ProductRoutes';
import loginRoutes from './member/login/LoginRouter';
import NotFoundPage from '../pages/user/product/NotFoundPage';
import MainPage from '../pages/MainPage';
import ReviewRouter from './user/review/ReviewRouter';

const router = createBrowserRouter([
  ...productRoutes,
  ...loginRoutes,
  ...ReviewRouter,
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