import { createBrowserRouter } from 'react-router-dom';
import productRoutes from './user/product/ProductRoutes';
import loginRoutes from './member/login/LoginRouter';
import NotFoundPage from '../pages/user/product/NotFoundPage';

const router = createBrowserRouter([
  ...productRoutes,
  ...loginRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);


export default router