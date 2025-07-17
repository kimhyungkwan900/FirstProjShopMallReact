import axios from "axios";
import { withCsrfEmpty } from "../../../utils/common/withCsrf";

// ✅ axios 공통 인스턴스 생성 (쿠키 자동 포함 + baseURL)
const axiosInstance = axios.create({
  withCredentials: true, // ✅ 이거 중요
});

//[1] 주문 생성 API
export const createOrder = async (memberId, orderData, csrfToken) => {
  return axiosInstance.post(`/api/orders/${memberId}`, orderData, withCsrfEmpty(csrfToken));
};


// [4] 배송 요청사항 저장 API
export const saveDeliveryRequest = async (orderData, csrfToken) => {
  return axiosInstance.post(`/api/orders/deliveryRequest`, orderData, withCsrfEmpty(csrfToken));
};