import { createBrowserRouter } from 'react-router-dom';
import productRoutes from './user/product/ProductRoutes';
import loginRoutes from './member/login/LoginRouter';
import reviewRoutes from './user/review/ReviewRouter';
import NotFoundPage from '../pages/user/product/NotFoundPage';
import MainPage from '../pages/MainPage';

const router = createBrowserRouter([
  ...productRoutes,
  ...loginRoutes,
  ...reviewRoutes,
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