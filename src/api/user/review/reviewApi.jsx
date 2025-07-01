import axios from 'axios';

const BASE_URL = "http://localhost:8080";

export const findReviewList = async (productId) => {
  const response = await axios.get(`${BASE_URL}/products`,{
    params : {productId}
  });

  return response.data; // { reviewList: [...], averageScore: number }
};

export const reactReview = async({memberId, reviewId, reaction}) => {
  const response = await axios.post(`${BASE_URL}/review-reactions`, null, {
    params: {
      memberId,
      reviewId,
      reaction,
    },
  });
  return response.data;  // 반드시 response.data를 리턴해야 함
}

export const myReviewList = async (memberId) => {
  const response = await axios.get(`${BASE_URL}/mypage/reviews`, {
    params: { memberId }
  });
  return response.data; // <-- 여기가 reviewList가 아니라 리스트 자체면 이걸 그대로 반환
};

export const reviewUpdate = async (reviewId) => {
  const response = await axios.get(`${BASE_URL}/mypage/review/update`,{
    params : {reviewId}
  });
  return response.data;
};

export const reviewUpdateAction = async (review) => {
  const { reviewId, ...reviewData } = review;

  const response = await axios.put(
    `${BASE_URL}/mypage/review/update`,
    reviewData,
    {
      params: { reviewId },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const reviewDelete = async(reviewId) => {
  const response = await axios.delete(`${BASE_URL}/mypage/review/delete`,{
    params : {reviewId}
  });
  return response.data;
}