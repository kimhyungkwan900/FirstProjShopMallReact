import { useState } from "react";
import { reviewWriter } from "../../../api/user/review/reviewWriterApi";
import StarRatingInput from "./StarRatingInput";

const ReviewWriterFormModal = ({ onClose, reviewInfo, onReviewWritten }) => {
  const [review, setReview] = useState({
    summation: "",
    reviewContent: "",
    score: "",
    memberId: reviewInfo?.memberId || null,
    orderId: reviewInfo?.orderId || null,
    productId: reviewInfo?.productId || null,
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const MAX_IMAGES = 10;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImgChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = MAX_IMAGES - imagePreviews.length;
    if (remainingSlots <= 0) {
      alert("이미지는 최대 10장까지 업로드할 수 있습니다.");
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);

    const readers = filesToAdd.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newPreviews) => {
      setImagePreviews((prev) => [...prev, ...newPreviews]);
      setImageFiles((prev) => [...prev, ...filesToAdd]);
    });
  };

  const handleRemoveImg = (indexToRemove) => {
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

 const handleSubmit = async (e) => {
  e.preventDefault(); 

  if (!review.score) {
    alert("별점을 선택해주세요.");
    return;
  }

  const reviewData = {
    memberId: reviewInfo.memberId,
    orderId: reviewInfo.orderId,
    productId: reviewInfo.productId,
    summation: review.summation,
    reviewContent: review.reviewContent,
    score: review.score,
  };

  try {
    await reviewWriter({ reviewData, imageFiles });
    alert("리뷰가 등록되었습니다.")
    onReviewWritten(reviewInfo.orderId);
    onClose();
    
  } catch (e) {
    console.error("리뷰 저장 실패", e);
  }
};

  return (
    <div
    className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-600 font-medium">평점</label>
        <StarRatingInput
                score={review.score}
                setScore={(newScore) =>
                setReview((prev) => ({ ...prev, score: newScore }))}/>
     </div>

      <div>
        <label className="block text-gray-600 font-medium">한줄평</label>
        <input
          type="text"
          name="summation"
          value={review.summation}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium">내용</label>
        <textarea
          name="reviewContent"
          value={review.reviewContent}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none"
          rows={10}
          required
        />
      </div>

      <div className="w-full max-w-md mx-auto">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          리뷰 이미지
        </label>

        <div className="flex flex-wrap gap-2 mb-4">
          {imagePreviews.map((src, idx) => (
            <div key={idx} className="relative w-24 h-24">
              <img
                src={src}
                alt={`preview-${idx}`}
                className="w-24 h-24 object-cover rounded border"
              />
              <button
                type="button"
                className="absolute top-0 right-0 w-5 h-5 bg-gray-500 text-xs text-white rounded-full flex items-center justify-center shadow hover:bg-blue-600"
                onClick={() => handleRemoveImg(idx)}
              >
                x
              </button>
            </div>
          ))}

          {imagePreviews.length < MAX_IMAGES && (
            <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded cursor-pointer hover:border-gray-400">
              <span className="text-3xl text-gray-400">+</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImgChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="flex justify-end-safe">
       <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
            >
            저장
            </button>
        <button
          type="button"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 ml-3"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </form>
     </div>
  </div>
  );
};

export default ReviewWriterFormModal;