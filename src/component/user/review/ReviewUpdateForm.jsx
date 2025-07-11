import { useEffect, useState } from "react";
import { reviewUpdate, reviewUpdateAction } from "../../../api/user/review/reviewApi";

import StarRatingInput from "./StarRatingInput";

const ReviewUpdateForm = ({ reviewId, onClose }) => {
  
  const BASE_URL = "http://localhost:8080";


  const [review, setReview] = useState({
    summation: "",
    reviewContent: "",
    score: 0,
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const [imageFiles, setImageFiles] = useState([]);

  // 저장 가능한 이미지 최대 개수 설정
  const MAX_IMAGES = 10;


  const handleImgChange = (e) => {
    const files = Array.from(e.target.files);
    // 최대 등록 가능한 이미지 수 - 등록한 이미지 수 
    const remainingSlots = MAX_IMAGES - imagePreviews.length;
    // 0이하 일때 경고 및 아래 실행 x
    if (remainingSlots <= 0) {
      alert("이미지는 최대 10장까지 업로드할 수 있습니다.");
      return;
    }

    // files 배열에서 최대 remainingSlots 개수만큼 파일을 잘라냄
    const filesToAdd = files.slice(0, remainingSlots);
    
    // 잘라낸 파일 각각에 대해 FIleReader를 사용하여 비동기적으로 파일 내용을 읽음
    const readers = filesToAdd.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader(); // 새 FileReader 인스턴스 생성
        // 파일 읽기가 완료되면 해당 파일을 데이터 URL을 resolve 하여 Promise를 ㅇ완료
        reader.onload = () => resolve(reader.result);
        // 파일을 Base64 형식의 데이터 URL로 읽음 
        reader.readAsDataURL(file);
      });
    });
  
    Promise.all(readers).then((newPreviews) => {
      // 읽어온 이미지 데이터(URL)를 기존 이미지 미리보기 배열에 추가
      setImagePreviews((prev) => [...prev, ...newPreviews]);
      // 실제 파일 객체들도 기존 이미지 파일 배열에 추가 
      setImageFiles((prev) => [...prev, ...filesToAdd]); 
    });
  };

  // 특정 인덱스에 해당하는 이미지를 삭제하는 함수
  const handleRemoveImg = (indexToRemove) => {
  setImagePreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  setImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));

  setReview((prev) => {
    if (!prev.existingImageIds) return prev;
    const newExistingIds = prev.existingImageIds.filter((_, idx) => idx !== indexToRemove);
    return { ...prev, existingImageIds: newExistingIds };
  });
};

  // 수정을 누른 리뷰 번호를 reviewUpdate 를 호출해 받아와서 변화 
  useEffect(() => {
    // 비동기 함수로 리뷰 데이터를 서버에서 가져옴
    const fetchReview = async () => {
      try {
        // reviewId를 이용해 리뷰데이터 요청 
        const data = await reviewUpdate(reviewId);
        // 응답 데이터에서 reivew 객체가 있으면 사용하고, 없으면 전체 데이터 사용
        const result = data.review ?? data;
        // 가져온 데이터를 상태로 설정(값이 없으면 겨우 기본 값으로 설정)
        setReview({
          summation: result.summation || "",
          reviewContent: result.reviewContent || "",
          score: result.score || 0,
          existingImageIds: result.reviewImgDTOList
          ? result.reviewImgDTOList.map(img => img.id)
          : [],
        });
       
        console.log(result.reviewImgDTOList)

        const previews = data.reviewImgDTOList.map((img) => BASE_URL + img.filePath);
        setImagePreviews(previews);
      } catch (error) {
        console.error("리뷰 불러오기 실패", error);
      }
    };
    // reivewId 가 있을 경우에만 fetchReview 실행
    if (reviewId) {
      fetchReview();
    }
  }, [reviewId]);

  // 등록한 리뷰 상태를 변화
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: name === "score" ? Number(value) : value,
    }));
  };

  // 수정한 리뷰 reviewupdateAction 호출 백엔드 연동 
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // 서버에 리뷰 수정 요청을 보냄
    await reviewUpdateAction(
      {
        ...review,            // 기존 리뷰 데이터 복사
        reviewId,             // 수정할 리뷰의 고유 ID 추가 
        keepImageIds: review.existingImageIds, // 👈 이 부분 추가
      },
      imageFiles             // 함께 전송할 이미지 파일들
    );

    console.log(review.reviewImgDTOList)

    alert("리뷰가 성공적으로 수정되었습니다.");
    onClose?.();
    window.location.reload(); // 페이지 새로고침으로 변경 사항 반영 
  } catch (err) {
    console.error(err);
    alert("리뷰 수정 실패");
  }
};
  return (
    <form onSubmit={handleSubmit}>

      <div>
        <input type="hidden" value={reviewId} name="reviewId" />
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
        />
      </div>

      <div className="w-full max-w-md mx-auto">
        <label className="block mb-2 text-sm font-medium text-gray-700">리뷰 이미지</label>

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

          {/* + 버튼 */}
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
  );
};

export default ReviewUpdateForm;