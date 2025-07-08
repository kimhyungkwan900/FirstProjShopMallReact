import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// 마이페이지 주문 목록 가져오기 (memberId 기준)
export const fetchMyOrderList = async (memberId, page = 0, size = 5, startDate, endDate, keyword) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    // 로그인 페이지로 리다이렉트하거나 예외 처리
    window.location.href = "/login"; // 또는 useNavigate 사용
    return;
  }

  const response = await axios.get(`${API_BASE_URL}/mypage/orderList`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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