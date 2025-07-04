import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api"; 

export const fetchAdminReviewList = async (filterType, page = 0, searchType = "", keyword = "" ) => {
  const response = await axios.get(`${API_BASE_URL}/admin/reviews`, {
    params: {
      filter: filterType,
      page: page,
      size: 5,
      searchType,
      keyword,
    },
  });

  return response.data;
};