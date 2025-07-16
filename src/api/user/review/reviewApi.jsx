import axios from 'axios';
import { withCsrf } from '../../../utils/common/withCsrf';

const API_BASE_URL = "http://localhost:8080/api";

export const findReviewList = async (productId, sort = "like") => {
  const response = await axios.get(`${API_BASE_URL}/product/review`,{
    params : {productId, sort }
  });

  return response.data; 
};

export const reactReview = async({memberId, reviewId, reaction,csrfToken}) => {
  const response = await axios.post(`${API_BASE_URL}/review-reactions`, null, withCsrf({params: {
      memberId,
      reviewId,
      reaction,
    }}, csrfToken));
  return response.data; 
}

export const myReviewList = async (memberId, page = 0, size, sort = "createdAt,DESC") => {
  const response = await axios.get(`${API_BASE_URL}/mypage/reviews`, {
    params: {
      memberId,
      page,
      size: 5,
      sort,
    },
    withCredentials: true, // 필요시 유지
  });
  return response.data;
};

// 서버에 리뷰 받아오기 요청 
export const reviewUpdate = async (reviewId) => {
  const response = await axios.get(`${API_BASE_URL}/mypage/review/update`,{
    params : {reviewId}
  });
  return response.data;
};

export const reviewUpdateAction = async (reviewData, imageFiles, csrfToken) => {
  const formData = new FormData();

  formData.append("reviewId", reviewData.reviewId);

  if (reviewData.keepImageIds && reviewData.keepImageIds.length > 0) {
    reviewData.keepImageIds.forEach((id) => {
      formData.append("keepImageIds", id); // 서버가 인식할 이름
    });
  }

  // review 객체는 JSON blob으로 보냄
  const reviewBlob = new Blob([JSON.stringify(reviewData)], {
    type: "application/json",
  });
  formData.append("review", reviewBlob);

  if (imageFiles && imageFiles.length > 0) {
    imageFiles.forEach((file) => {
      formData.append("reviewImgFile", file);
    });
  }

  // ✅ formData에 뭐가 들어있는지 확인
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  const response = await axios.put(
    `${API_BASE_URL}/mypage/review/update`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRF-TOKEN": csrfToken,
      },
      withCredentials: true,
    }
  );

  return response.data;
};


// 서버에 리뷰 삭제 요청 
export const reviewDelete = async(reviewId, csrfToken) => {
  const response = await axios.delete(`${API_BASE_URL}/mypage/review/delete`,withCsrf({params : {reviewId}},csrfToken));
  return response.data;
}

