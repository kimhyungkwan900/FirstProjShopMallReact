import axios from "axios";

// ✅ axios 공통 인스턴스 생성 (쿠키 자동 포함 + baseURL)
const axiosInstance = axios.create({
  withCredentials: true, // ✅ 이거 중요
});

//[1] 주문 생성 API
export const createOrder = async (memberId, orderData) => {
  return axiosInstance.post(`/api/orders/${memberId}`, orderData);
};

//[2] 결제 성공 처리 API
export const completeOrder = async (orderId) => {
  return axiosInstance.post(`/api/orders/${orderId}/complete`);
};

//[3] 결제 실패 처리 API
export const failedOrder = async (orderId) => {
  return axiosInstance.post(`/api/orders/${orderId}/failed`);
};

// [4] 배송 요청사항 저장 API
export const saveDeliveryRequest = async (orderData) => {
  return axiosInstance.post(`/api/orders/deliveryRequest`, orderData);
};

//[5] 결제 처리 API
export const payOrder = async (orderId, paymentToken) => {
  return axiosInstance.post(`/api/orders/${orderId}/pay`, null, {
    params: { paymentToken },
  });
};

