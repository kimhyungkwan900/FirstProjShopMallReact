import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const insertOrderReturn = async (orderReturnDTO) => {
  const response = await axios.post(`${API_BASE_URL}/mypage/order/return`, orderReturnDTO);
  return response.data;
};