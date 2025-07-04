import { useEffect, useState } from "react";
import { fetchAdminReviewList } from "../../../api/admin/review/AdminReviewApi";
import ReviewImgModal from "../../user/review/ReviewImgModal";

const BASE_URL =  "http://localhost:8080";

const AdminReviewContent = ({ filterType, page, setPage , searchParams }) => {
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { type, keyword } = searchParams;
      const data = await fetchAdminReviewList(filterType, page, type, keyword);
      setReviews(data.content);
      setTotalPages(data.totalPages);
    };

    fetchData();
  }, [filterType, page, searchParams]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">리뷰가 없습니다.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-gray-50 mb-4">
            <div className="flex justify-between">
                <div>작성 자 : <strong>{review.memberId}</strong></div> 
                <div>작성 날짜 : {review.createdAt}</div>
            </div>
            <div className={`font-bold ${review.reviewStatus === 'normal' ? 'text-green-500' : 'text-red-500'}`}>상태: {review.reviewStatus}</div>
            <div className="w-[80%]">한줄 요약 : {review.summation}</div>
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
    </div>
  );
};

export default AdminReviewContent;