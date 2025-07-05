import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api"; 

export const adminReviewBlindAction = async (blindData) => {
  const response = await axios.post(`${API_BASE_URL}/admin/review/blind`, blindData);
  return response.data;
};

export const adminReviewUnBlindAction = async(reviewId) => {
    const response = await axios.delete(`${API_BASE_URL}/admin/review/blind`,{
        params : {reviewId}
    })
    return response.data;
}

