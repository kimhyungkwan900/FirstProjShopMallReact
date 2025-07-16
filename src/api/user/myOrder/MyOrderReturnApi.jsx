import axios from "axios";
import { withCsrfEmpty } from "../../../utils/common/withCsrf";

const API_BASE_URL = "http://localhost:8080/api";

export const insertOrderReturn = async (orderReturnDTO, csrfToken) => {
  const response = await axios.post(`${API_BASE_URL}/mypage/order/return`, orderReturnDTO, withCsrfEmpty(csrfToken));
  return response.data;
};