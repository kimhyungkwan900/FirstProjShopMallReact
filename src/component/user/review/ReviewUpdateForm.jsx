import { useEffect, useState } from "react";
import { reviewUpdate, reviewUpdateAction } from "../../../api/user/review/reviewApi";

const ReviewUpdateForm = ({ reviewId, onClose }) => {
  const [review, setReview] = useState({
    summation: "",
    reviewContent: "",
    score: 0,
  });

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const data = await reviewUpdate(reviewId);
        const result = data.review ?? data;
       setReview({
            summation: result.summation || "",
            reviewContent: result.reviewContent || "", // ✅ 올바르게 수정
            score: result.score || 0,
    });
      } catch (error) {
        console.error("리뷰 불러오기 실패", error);
      }
    };
    if (reviewId) {
        fetchReview();
    }
  }, [reviewId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: name === "score" ? Number(value) : value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await reviewUpdateAction({
      ...review,
      reviewId, 
    });
    alert("리뷰가 성공적으로 수정되었습니다.");
    onClose?.();
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert("리뷰 수정 실패");
  }
};


  return (
    <form onSubmit={handleSubmit} >
      <div>
        <input type="hidden" value={reviewId} name = "reviewId"></input>
        <label className="block text-gray-600 font-medium">평점</label>
        <input
          type="number"
          name="score"
          value={review.score}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          min={0}
          max={5}
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium">한줄평</label>
        <input
          type="text"
          name="summation"
          value={review.summation}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium">내용</label>
        <textarea
            name="reviewContent"
            value={review.reviewContent}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none"
            rows={10}/>
      </div>
        <div className="flex justify-end-safe">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">
                저장
            </button>
            <button type="button" className= "bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 ml-3" onClick = {onClose}>
                닫기</button>
        </div>
    </form>
  );
};

export default ReviewUpdateForm;