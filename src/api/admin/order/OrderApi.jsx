import axios from "axios";


//[1] 주문 생성 API
export const createOrder = async (memberId, orderData) => {
  const response = await axios.post(`"/api/orders"}/${memberId}`, orderData);
  return response.data; // Long 타입: 생성된 주문 ID
};

/**
 * [2] 결제 성공 처리 API
 * @param {number} orderId - 결제 완료 처리할 주문 ID
 * @returns {Promise<string>} 처리 결과 메시지
 */
export const completeOrder = async (orderId) => {
  const response = await axios.post(`"/api/orders"/${orderId}/complete`);
  return response.data;
};

/**
 * [3] 결제 실패 처리 API
 * @param {number} orderId - 결제 실패 처리할 주문 ID
 * @returns {Promise<string>} 처리 결과 메시지
 */
export const failedOrder = async (orderId) => {
  const response = await axios.post(`"/api/orders"/${orderId}/failed`);
  return response.data;
};

/**
 * [4] 배송 요청사항 저장 API
 * @param {Object} orderData - 주문 정보 (OrderDto 형태)
 * @returns {Promise<number>} 생성된 주문 ID
 */
export const saveDeliveryRequest = async (orderData) => {
  const response = await axios.post(`"/api/orders"/deliveryRequest`, orderData);
  return response.data; // Long 타입: 생성된 주문 ID
};

/**
 * [5] 결제 처리 API
 * @param {number} orderId - 결제할 주문 ID
 * @param {string} paymentToken - 결제 인증 토큰
 * @returns {Promise<string>} 결제 처리 결과 메시지
 */
export const payOrder = async (orderId, paymentToken) => {
  const response = await axios.post(`"/api/orders"/${orderId}/pay`, null, {
    params: { paymentToken },
  });
  return response.data;
};
