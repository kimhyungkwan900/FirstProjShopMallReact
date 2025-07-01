import { myReviewList, reviewDelete } from "../../../api/user/review/reviewApi";
import { useEffect, useState } from "react";
import ReviewUpdateModalButton from "./ReviewUpdateModalButton";

const MyReviewContent = ({ memberId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await myReviewList(memberId);
                setReviews(data || []);
            } catch (error) {
                console.error(error);
            }
        };
        if (memberId) {
            fetchReviews();
        }
    }, [memberId]);

    const handleDelete = async (reviewId) => {
    try {
        await reviewDelete(reviewId);
        alert("리뷰가 삭제되었습니다.");
        // 삭제 후 목록에서 제거
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (error) {
        console.error("삭제 실패", error);
        alert("삭제에 실패했습니다.");
    }
};
    
    return (
    <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">내가 작성한 리뷰</h2>

        {reviews.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">작성한 리뷰가 없습니다.</div>
        ) : (
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-gray-50">
                        <div className="truncate w-full">
                            <div className="font-semibold mr-2">
                               <div className="flex justify-between w-full">
                                    <div className="break-words whitespace-normal max-w-[85%] ">
                                        한줄 요약 : {review.summation}
                                    </div>
                                </div>
                            
                            </div>
                            <hr className="mt-3 mb-3"/>
                            <div className="text-gray-700 mr-4 max-w-[85%] whitespace-normal break-words">내용: {review.reviewContent}</div>
                                <div className="text-sm text-yellow-600 mr-4">⭐ {review.score}점</div>
                                    <div className="text-sm text-gray-600 mt-2 flex items-center justify-between">
                            
                            <div>
                                {review.updatedAt
                                ? `수정한 날짜 : ${new Date(review.updatedAt).toLocaleString()}`
                                : `작성한 날짜 : ${new Date(review.createdAt).toLocaleString()}`}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <ReviewUpdateModalButton reviewId={review.id} />
                                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
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
    </div>
    );
};

export default MyReviewContent;