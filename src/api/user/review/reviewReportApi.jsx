import axios from "axios"
// 리뷰 신고
const API_BASE_URL = "http://localhost:8080/api";
export const reviewReportAction = async (reportData) => {
  const response = await axios.post(`${API_BASE_URL}/review/report`, reportData);
  return response.data;
}