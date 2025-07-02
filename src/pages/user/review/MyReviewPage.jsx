
import MyReviewContent from "../../../component/user/review/MyReviewContent";

const MyReviewPage =() => {
    const memberId = 1;
    return(
        <div>
            <h1 className="text-3xl text-center mt-3">MyPage 리뷰 목록</h1>
            <MyReviewContent memberId = {memberId}/>
        </div>
    )
}

export default MyReviewPage;