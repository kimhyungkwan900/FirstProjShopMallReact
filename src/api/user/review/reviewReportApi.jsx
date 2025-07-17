import axios from "axios"
import { withCsrfEmpty } from "../../../utils/common/withCsrf";
// 리뷰 신고
const API_BASE_URL = "http://localhost:8080/api";
export const reviewReportAction = async (reportData,csrfToken) => {
  const response = await axios.post(`${API_BASE_URL}/review/report`, reportData, withCsrfEmpty(csrfToken));
  return response.data;
}