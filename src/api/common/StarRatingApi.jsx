// StarRatingApi.jsx
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// 평균 별점 가져오기
export const getStarRating = async (productId) => {
  const response = await axios.get(`${API_BASE_URL}/starRating`, {
    params: { productId },
  });
  return response.data;
};