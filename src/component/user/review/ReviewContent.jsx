import { useEffect, useState } from "react";
import { findReviewList, reactReview} from "../../../api/user/review/reviewApi";
import ReviewImgModal from "./ReviewImgModal";
import ReviewReportModal from "./ReviewReportModal";
import StarScore from "./StarScore";


import StartRating from "../../common/starRating/StarRating";
import { useCsrfToken } from "../../../hooks/common/useCsrfToken";

const ReviewContent = ({ productId, memberId }) => {

   const BASE_URL = "http://localhost:8080";

  const [reviews, setReviews] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReviewId, setReportReviewId] = useState(null);

  const [sortOrder, setSortOrder] = useState("like");

  const csrfToken = useCsrfToken();

 const handleReaction = async (reviewId, reactionType) => {
    if (memberId === undefined) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      await reactReview({ memberId, reviewId, reaction: reactionType, csrfToken });
      fetchReviews(sortOrder);
    } catch (error) {
      console.error("반응 처리 실패", error);
    }
  };

  const fetchReviews = async (sort) => {
    try {
      const data = await findReviewList(productId, sort);
      setReviews(data.reviewList || []);
    } catch (error) {
      console.error("리뷰 불러오기 실패:", error);
    }
  };

 useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await findReviewList(productId, sortOrder);
      setReviews(data.reviewList || []);

    } catch (error) {
      console.error("리뷰 불러오기 실패:", error);
    }
  };

  if (productId) {
    fetchData();
  }
}, [productId, sortOrder]);

  return (
    <div className="space-y-6">
        {reviews.length !== 0 && (
          <div className="flex justify-between">
          <div className="font-bold text-gray-800 flex gap-2">
            <span>평균 평점 :</span>
            <StartRating productId={productId}/> 
          </div>
          <div className="flex space-x-4 mb-4">

          <button
          className={`px-4 py-2 rounded ${
            sortOrder === "like" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSortOrder("like")}>
          좋아요순
          </button>
          
          <button
          className={` px-4 py-2 rounded ${
            sortOrder === "latest" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSortOrder("latest")}>
          최신순
          </button>
      </div>
      </div>
          )}
        {reviews.length === 0 ? (
          <div className="text-gray-500 text-center text-3xl">등록된 리뷰가 없습니다.</div>
        ) : (
          reviews.map((review) =>
            review.reviewStatus === "blinded" ? (
              <div
                key={review.id}
                className="bg-gray-100 text-center p-6 rounded-2xl shadow-md text-gray-500 italic"
              >
                블라인드 처리된 리뷰입니다.
              </div>
            ) : (
      
      <div
        key={review.id}
        className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <div className="flex justify-between">
            <div className="font-bold">작성자 : {review.memberNickname}</div>
            <StarScore score={review.score}/>
          </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-lg font-semibold text-gray-800">
            한줄 리뷰 : {review.summation || "없음"}
          </span>
        </div>
        <div className="text-gray-700">
          <strong className="text-gray-900">내용 :</strong>{" "}
          {review.reviewContent || "내용 없음"}
        </div>

      
         

       <div className="flex justify-between items-center pt-2">
  {/* 버튼 그룹 - 왼쪽 */}
  <div className="space-x-4">
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      onClick={() => handleReaction(review.id, "like")}
    >
      <span>{review.likeCount}</span> 👍
    </button>
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      onClick={() => handleReaction(review.id, "dislike")}
    >
      <span>{review.dislikeCount}</span> 👎
    </button>
  </div>

  <div>
    {review.reviewImgDTOList && review.reviewImgDTOList.length > 0 ? (
      <img
        src={`${BASE_URL}${review.reviewImgDTOList[0].filePath}`}
        alt="리뷰 이미지"
        className="w-24 h-24 object-cover rounded-md cursor-pointer border"
        onClick={() => {
          setSelectedImages(review.reviewImgDTOList);
          setIsModalOpen(true);
        }}
      />
    ) : null}
  </div>
</div>
      <div className="flex justify-between">
        <div className="text-sm text-gray-600 mt-2">
          {review.updatedAt
            ? `수정한 날짜 : ${new Date(review.updatedAt).toLocaleString()}`
            : `작성한 날짜 : ${new Date(review.createdAt).toLocaleString()}`}
        </div>

        <button
        className="text-sm text-red-500 underline"
        onClick={() => {
          if(memberId !== null){

            setIsReportOpen(true);
            setReportReviewId(review.id);
          }else{
            alert("로그인 후 이용해 주세요")
          }
        }}>
        신고하기
        </button>
      </div>
    </div>
    )
  )
)}
{/* 이미지 모달창 열고 닫기 */}
{isModalOpen && (
  <ReviewImgModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    images={selectedImages}
  />
)}
{/* 신고 모달창 열고 닫기 */}
{isReportOpen &&(
  <ReviewReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        reviewId={reportReviewId} />
        )}
    </div>
  );
};

export default ReviewContent;