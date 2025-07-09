import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// 마이페이지 주문 목록 가져오기 (memberId 기준)
export const fetchMyOrderList = async (memberId, page = 0, size = 5, startDate, endDate, keyword) => {
  const response = await axios.get(`${API_BASE_URL}/orderList`, {
    params: {
      memberId,
      page,
      size,
      startDate,
      endDate,
      keyword,
    },
  });

  return response.data;
};