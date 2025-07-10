import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const deleteOrder = async (orderId) => {
  const response = await axios.post(`${API_BASE_URL}/orderDelete`, {
    param : orderId
  });
  return response.data;
};