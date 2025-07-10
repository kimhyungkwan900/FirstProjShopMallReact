import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// 파라미터: memberId, returnType, page, size
export const findChangeList = async ({ memberId, returnType, page = 0, size = 10 }) => {
  const params = {
    memberId,
    page,
    size,
  };

  if (returnType) {
    params.returnType = returnType; // null일 경우 생략
  }

  const response = await axios.get(`${API_BASE_URL}/mypage/order/changeList`, { params });
  return response.data; // Page<OrderChangeHistoryDTO>
};