// src/router/user/review/ReviewRouter.jsx
import MyReviewPage from '../../../pages/user/review/MyReviewPage';
import AdminReviewPage from '../../../pages/admin/review/AdminReviewPage';
import MyOrderPage from '../../../pages/user/myOrder/MyOrderPage';
import MyOrderChangeHistoryPage from '../../../pages/user/myOrder/MyOrderChangeHistoryPage';
const ReviewRouter = [
  {
    path: '/mypage/reviews',
    element: <MyReviewPage />
  },
  {
    path: '/admin/review',
    element: <AdminReviewPage/>
  },
  {
    path : '/mypage/orders',
    element: <MyOrderPage/>
  },
  {
    path : '/mypage/orderChangeHistory',
    element: <MyOrderChangeHistoryPage/>
  }
];

export default ReviewRouter;