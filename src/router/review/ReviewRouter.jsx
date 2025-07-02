import { Router, Routes, Route } from 'react-router-dom';

import MyReviewPage from '../../pages/user/review/MyReviewPage';


const ReviewRouter = () => {
  return(
   <Router>
    {/* 마이페이지 리뷰 */}
    <Route path="/mypage/review" element = {<MyReviewPage/>}/>
   </Router>   
  )
}

export default ReviewRouter;