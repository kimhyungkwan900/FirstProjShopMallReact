import { useEffect, useState } from "react";
import { findReviewList, reactReview} from "../../../api/user/review/reviewApi";

const ReviewContent = ({ productId, memberId }) => {

   const BASE_URL = "http://localhost:8080";

  const [reviews, setReviews] = useState([]);
  const [averageScore, setAverageScore] = useState(null);


 const handleReaction = async (reviewId, reactionType) => {
  if(memberId === null){
    alert("로그인이 필요합니다.")
    return; 
  }
  try {
    // 서버에 반응 업데이트 요청
    await reactReview({ memberId, reviewId, reaction: reactionType });
  } catch (error) {
    console.error("반응 처리 실패", error);
    // 실패 시 롤백 로직 필요할 수 있음
  }
};


 useEffect(() => {
  const fetchReviews = async () => {
    try {
      const data = await findReviewList(productId);
      setReviews(data.reviewList || []);
      setAverageScore(data.averageScore);
      // setImagePreviews 삭제!
    } catch (error) {
      console.error("리뷰 불러오기 실패:", error);
    }
  };

  if (productId) {
    fetchReviews();
  }
}, [productId]);

  return (
    <div className="space-y-6">
        {reviews.length !== 0 && (
            <h2 className="text-2xl font-bold text-gray-800">
                평균 평점: {averageScore ?? "N/A"}
            </h2>
        )}
     

      {reviews.length === 0 ? (
        <div className="text-gray-500 text-center text-3xl">등록된 리뷰가 없습니다.</div>
      ) : (
        reviews.map((review) => (
            
          <div
            key={review.id}
            className="bg-white p-6 rounded-2xl shadow-md space-y-4"
          >
              <div className="flex flex-wrap gap-2">
      {review.reviewImgDTOList && review.reviewImgDTOList.length > 0 ? (
        review.reviewImgDTOList.map((img) => (
          <img
            key={img.id}
            src={`${BASE_URL}${img.filePath}`}
            alt="리뷰 이미지"
            className="w-24 h-24 object-cover rounded-md"
          />
        ))
      ) : (
        <div>이미지가 없습니다.</div>
      )}
    </div>

            {/* 요약 & 날짜 */}
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-lg font-semibold text-gray-800">
                한줄 리뷰 : {review.summation || "없음"}
              </span>
            </div>

            {/* 본문 내용 */}
            <div className="text-gray-700">
              <strong className="text-gray-900">내용 :</strong>{" "}
              {review.reviewContent || "내용 없음"}
            </div>

            {/* 점수 표시 */}
            <div className="text-gray-700">
              <strong className="text-gray-900">평점 :</strong>{" "}
              {review.score} 
            </div>

            {/* 좋아요/싫어요 버튼 */}
            <div className="flex space-x-4 pt-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                onClick={() => handleReaction(review.id, "like")}
              >
                <span>{review.likeCount}</span>
                👍
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => handleReaction(review.id, "dislike")}
              >
                <span>{review.dislikeCount}</span>
                👎
              </button>
              
            </div>
           <div className="text-sm text-gray-600 mt-2">
                {review.updatedAt
                ? `수정한 날짜 : ${new Date(review.updatedAt).toLocaleString()}`
                : `작성한 날짜 : ${new Date(review.createdAt).toLocaleString()}`}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewContent;