import axios from "axios";
import { withCsrf, withCsrfEmpty } from "../../../utils/common/withCsrf";
const API_BASE_URL = "http://localhost:8080/api"; 

export const adminReviewBlindAction = async (blindData, csrfToken) => {
  const response = await axios.post(`${API_BASE_URL}/admin/review/blind`, blindData, withCsrfEmpty(csrfToken));
  return response.data;
};

export const adminReviewUnBlindAction = async(reviewId, csrfToken) => {
    const response = await axios.delete(`${API_BASE_URL}/admin/review/blind`, withCsrf({ params: { reviewId } }, csrfToken));
    return response.data;
}

