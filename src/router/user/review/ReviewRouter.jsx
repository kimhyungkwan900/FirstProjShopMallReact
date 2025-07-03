import { Routes, Route } from 'react-router-dom';
import MyReviewPage from '../../pages/user/review/MyReviewPage';

const ReviewRouter = () => {
  return (
    <Routes>
      <Route path="/mypage/review" element={<MyReviewPage />} />
    </Routes>
  );
};

export default ReviewRouter;