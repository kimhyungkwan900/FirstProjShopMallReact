import { useEffect, useState } from "react";
import { fetchAdminReviewList } from "../../../api/admin/review/AdminReviewApi";
import { adminReviewUnBlindAction } from "../../../api/admin/review/AdminReviewBlindAPi";
import ReviewImgModal from "../../user/review/ReviewImgModal";
import AdminReviewBlindModal from "./AdminReviewBlindModal";
import AdminReviewReportModal from "./AdminReviewReportModal";

const BASE_URL =  "http://localhost:8080";

const AdminReviewContent = ({ filterType, page, setPage , searchParams }) => {
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isBlindOpen, setIsBlindOpen] = useState(false);
  const [blindReviewId, setBlindReviewId] = useState(null);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReviewId, setReportReviewId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const { type, keyword } = searchParams;
      const data = await fetchAdminReviewList(filterType, page, type, keyword);
      setReviews(data.content);
      setTotalPages(data.totalPages);

    };

    fetchData();
  }, [filterType, page, searchParams]);

 const handleUnblind = async (reviewId) => {
  // 취소 선택시 함수 종료
  if (!window.confirm("정말 블라인드 해제 하시겠습니까?")) {
    return;
  }
  try {
    await adminReviewUnBlindAction(reviewId);
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId ? { ...review, reviewStatus: "normal", blindReason: null } : review
      )
    );
    alert("블라인드가 해제되었습니다.");
  } catch (error) {
    console.error("블라인드 해제 실패", error);
  }
};

const handleAfterBlind = (reviewId, blindReason) => {
  setReviews((prev) =>
    prev.map((review) =>
      review.id === reviewId
        ? { ...review, reviewStatus: "blinded", blindReason }
        : review
    )
  );
};

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {reviews.length === 0 ? (
       <div className="flex items-center justify-center text-gray-500 h-60 mt-4 text-center">
        작성한 리뷰가 없습니다.
      </div>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-gray-50 mb-4 font-bold">
            <div className="flex justify-between font-bold">
                <div>작성 자 : <strong>{review.userId}</strong></div> 
                <div>작성 날짜 : {review.createdAt}</div>
            </div>
            <div>상품 명 : {review.productName}</div>
            <div className="flex justify-between">
            <div className={`font-bold ${review.reviewStatus === 'normal' ? 'text-green-500' : 'text-red-500'}`}>
            <span>상태: </span>
            {review.reviewStatus === 'blinded' ? '블라인드' : '정상'}
             {review.reviewStatus === 'blinded' && (
              <span className="ml-10">사유: {review.blindReason}</span>
            )}
            </div>
            
            <div>신고 건수 : {review.reportCount} 건
              {/* 신고 건수가 1개 이상이면 버튼 신고 내역 보는 버튼 생성  */}
              {review.reportCount > 0 && (
              <button className="border text-white rounded p-1 bg-blue-500 font-bold ml-2"
              onClick={() => {
              setReportReviewId(review.id);
              setIsReportModalOpen(true);}}>
              보기
              </button>)}
            </div>
            </div>
            <div className="flex justify-between mb-2">
            <div className="w-[80%] font-bold">한줄 요약 : {review.summation}</div>
            {/* 블라인드 처리된 리뷰에 블라인드해제 버튼 블라인드 안된 리뷰에 블라인브 버튼 */}
            {review.reviewStatus === "normal" ? (
              <button className="border text-white rounded p-1 bg-red-500 font-bold"
              onClick={() => {
                setBlindReviewId(review.id);
                setIsBlindOpen(true);
              }}>
              블라인드
              </button>
            ) : (
            <button
            onClick={() => handleUnblind(review.id)}
            className="border text-white rounded p-1 bg-green-500 font-bold">
            블라인드 해제
            </button>
            )}

            </div>
            <div className="flex justify-between">
            <div className="w-[80%]">내용: {review.reviewContent}</div>
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
           
          </div>
        ))
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
        <button
            key={index}
            onClick={() => setPage(index)}
            className={`px-3 py-1 border rounded-md text-sm transition ${
            page === index
            ? "bg-blue-500 text-white font-semibold"
            : "bg-white text-gray-700 hover:bg-gray-100"
            }`} >
        {index + 1}
        </button>
        ))}

        </div>
    )}
{/* 이미지 모달 */}
{isModalOpen && (
        <ReviewImgModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={selectedImages}/>
        )}
{/* 블라인드 모달 */}
{isBlindOpen && (
  <AdminReviewBlindModal
    isOpen={isBlindOpen}
    onClose={() => setIsBlindOpen(false)}
    reviewId={blindReviewId}
    onBlindSuccess={handleAfterBlind}/>
)}
{/* 신고 리스트  */}
{isReportModalOpen && (
  <AdminReviewReportModal
    reviewId={reportReviewId}
    onClose={() => setIsReportModalOpen(false)}
  />
)}
    </div>

  
  );
};

export default AdminReviewContent;