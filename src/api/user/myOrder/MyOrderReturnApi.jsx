import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// 마이페이지 주문 목록 가져오기 (memberId 기준)
export const insertOrderReturn = async (orderReturnDTO) => {
  const response = await axios.post(`${API_BASE_URL}/mypage/order/return`, orderReturnDTO);
  return response.data;
};