
import MyReviewContent from "../../../component/user/review/MyReviewContent";
import ReviewButton from "../../../component/user/review/ReviewButton";
const MyReviewPage =() => {
    const memberId = 1;
    return(
        <div>
            <ReviewButton productId = {1}/>
            <h1 className="text-3xl text-center mt-3">MyPage 리뷰 목록</h1>
            <MyReviewContent memberId = {memberId}/>
        </div>
    )
}

export default MyReviewPage;