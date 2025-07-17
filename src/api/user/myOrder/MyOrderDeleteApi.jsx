import axios from "axios";
import { withCsrf } from "../../../utils/common/withCsrf";

const API_BASE_URL = "http://localhost:8080/api";

export const deleteOrder = async (orderId, csrfToken) => {
  const response = await axios.post(
    `${API_BASE_URL}/orderDelete`,
    { param: orderId }, // 🔥 key를 'param'으로 맞춰줌
    withCsrf({}, csrfToken)
  );
  return response.data;
};