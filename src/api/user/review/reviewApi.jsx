import axios from 'axios';

const BASE_URL = "http://localhost:8080";

export const findReviewList = async (productId) => {
  const response = await axios.get(`${BASE_URL}/products`,{
    params : {productId}
  });

  return response.data; 
};

export const reactReview = async({memberId, reviewId, reaction}) => {
  const response = await axios.post(`${BASE_URL}/review-reactions`, null, {
    params: {
      memberId,
      reviewId,
      reaction,
    },
  });
  return response.data; 
}

export const myReviewList = async (memberId) => {
  const response = await axios.get(`${BASE_URL}/mypage/reviews`, {
    params: { memberId }
  });
  return response.data; 
};

// 서버에 리뷰 받아오기 요청 
export const reviewUpdate = async (reviewId) => {
  const response = await axios.get(`${BASE_URL}/mypage/review/update`,{
    params : {reviewId}
  });
  return response.data;
};


export const reviewUpdateAction = async (reviewData, imageFiles) => {
  const formData = new FormData();

  formData.append("reviewId", reviewData.reviewId);

  // 기존 이미지 경로 리스트 (또는 ID 리스트)를 keepFilePaths로 보내야 함
  if (reviewData.existingImageIds && reviewData.existingImageIds.length > 0) {
    reviewData.existingImageIds.forEach((id) => {
      formData.append("keepFilePaths", id);  // 서버가 expect하는 이름과 동일하게
    });
  }

  // review 객체는 JSON blob으로 보냄
  const reviewBlob = new Blob([JSON.stringify(reviewData)], {
    type: "application/json",
  });
  formData.append("review", reviewBlob);

  // 새로 추가한 이미지 파일들
  if (imageFiles && imageFiles.length > 0) {
    imageFiles.forEach((file) => {
      formData.append("reviewImgFile", file);
    });
  }

  const response = await axios.put(
    "http://localhost:8080/mypage/review/update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
// 서버에 리뷰 삭제 요청 
export const reviewDelete = async(reviewId) => {
  const response = await axios.delete(`${BASE_URL}/mypage/review/delete`,{
    params : {reviewId}
  });
  return response.data;
}