import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api"; 

export const fetchAdminReviewList = async (filterType, page = 0, searchType = "", keyword = "" ) => {
  const response = await axios.get(`${API_BASE_URL}/admin/review`, {
    params: {
      filter: filterType,
      page: page,
      size: 5,
      searchType,
      keyword,
    },withCredentials: true,

  });

  return response.data;
};
