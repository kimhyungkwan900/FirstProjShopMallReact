import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; 

export const adminReviewReportList = async (reviewId) => {
  const response = await axios.get(`${API_BASE_URL}/admin/review/report`, {
  params: { reviewId }
});
  return response.data;
};
