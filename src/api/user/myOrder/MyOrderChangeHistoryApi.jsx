import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const findChangeList = async ({ memberId, returnType, page = 0, size = 10 }) => {
  const params = {
    memberId,
    page,
    size,
  };

  if (returnType) {
    params.returnTypes = Array.isArray(returnType) ? returnType.join(",") : returnType;
  }

  const response = await axios.get(`${API_BASE_URL}/mypage/order/changeList`, {
    params,
    withCredentials: true,
  });

  return response.data;
};