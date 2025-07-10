import { myReviewList, reviewDelete } from "../../../api/user/review/reviewApi";
import { useEffect, useState } from "react";
import ReviewUpdateModalButton from "./ReviewUpdateModalButton";
import ReviewImgModal from "./ReviewImgModal";

const MyReviewContent = ({ memberId }) => {
  const [reviews, setReviews] = useState([]); // 내가 작성한 리뷰 리스트 상태

  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  const BASE_URL =  "http://localhost:8080";

  useEffect(() => {
  const fetchReviews = async () => {
    try {
      const data = await myReviewList(memberId, page); // ← page 반영
      setReviews(data.content); // ← Spring Data Page 기준
      setTotalPages(data.totalPages); // 전체 페이지 수 저장
    } catch (error) {
      console.error(error);
    }
  };

  if (memberId !== undefined) {
    fetchReviews();
  }
}, [memberId, page]); // ✅ page 추가

  // 리뷰 삭제 함수
  const handleDelete = async (reviewId) => {
    const option = confirm("리뷰를 정말 삭제하시겠습니까? (삭제 후 복구 불가능)");
    try {
      if (option) {
        await reviewDelete(reviewId); // 서버에 삭제 요청
        alert("리뷰가 삭제되었습니다.");
        // 삭제한 리뷰를 화면에서도 제거
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      }
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div className="w-250 mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center ">내가 작성한 리뷰</h2>

      {/* 리뷰 없을 때 메시지 */}
      {reviews.length === 0 ? (
       <div className="flex items-center justify-center text-gray-500 h-60 mt-4 text-center">
        작성한 리뷰가 없습니다.
      </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-gray-50"
            >
              {/* 리뷰 내용 영역 */}
              <div className="truncate w-full">
                {/* 한줄 요약 */}
                <div className="font-semibold mr-2">
                  <div>상품 명 : <a
                    href={`/products/${review.productId}`}
                    target="_blank"
                    rel="noopener noreferrer">
                  {review.productName}
                </a></div>
                  <hr className="mt-3 mb-3" />
                  <div className="flex justify-between w-full">
                    <div className="break-words whitespace-normal max-w-[85%]">
                      한줄 요약 : {review.summation}
                    </div>
                  </div>
                </div>


                {/* 본문 내용 */}
                <div className="flex">
                  <div className="text-gray-700 mr-4 w-[85%] whitespace-normal break-words">
                    내용: {review.reviewContent}
                  </div>
                  <div>
                     {review.reviewImgDTOList && review.reviewImgDTOList.length > 0 ? (
              <img
                src={`${BASE_URL}${review.reviewImgDTOList[0].filePath}`}
                alt="리뷰 이미지"
                className="w-24 h-24 object-cover rounded-md cursor-pointer border"
                onClick = {() => {
                  setSelectedImages(review.reviewImgDTOList);
                  setIsModalOpen(true);
                }}/>
          ) : (
            <div></div>
          )}

                  </div>
                </div>

                {/* 평점 */}
                <div className="text-sm text-yellow-600 mr-4">⭐ {review.score}점</div>

                {/* 날짜 + 수정/삭제 버튼 */}
                <div className="text-sm text-gray-600 mt-2 flex items-center justify-between">
                  {/* 작성/수정일 */}
                  <div>
                    {review.updatedAt
                      ? `수정한 날짜 : ${new Date(review.updatedAt).toLocaleString()}`
                      : `작성한 날짜 : ${new Date(review.createdAt).toLocaleString()}`}
                  </div>

                  {/* 수정/삭제 버튼 */}
                  <div className="flex items-center space-x-2">
                    <ReviewUpdateModalButton reviewId={review.id} />
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      onClick={() => handleDelete(review.id)}>
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <ReviewImgModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={selectedImages}/>
        )}

        {/* 페이지네이션 버튼 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`px-3 py-1 border rounded-md text-sm ${
                page === index
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  
  
};

export default MyReviewContent;
