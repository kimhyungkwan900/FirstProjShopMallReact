import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const MyReviewPage = lazy(() => import('../../pages/user/review/MyReviewPage'));
const MyPage = lazy(() => import('../../pages/user/review/MyPage'))

const ReviewRouter = createBrowserRouter([
  {
    path: '/',
    element : <Suspense fallback ={<div>Loading...</div>}><MyPage/></Suspense>
  },
  {
    path: '/myPage/review',
    element: <Suspense fallback={<div>Loading...</div>}><MyReviewPage /></Suspense>
  },
]);

export default ReviewRouter;