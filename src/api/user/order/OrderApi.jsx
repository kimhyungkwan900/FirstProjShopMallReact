import axios from "axios";

//[1] 주문 생성 API
export const createOrder = async (memberId, orderData) => {
  const response = await axios.post(`/api/orders/${memberId}`, orderData);
  return response.data; // Long 타입: 생성된 주문 ID
};

//[2] 결제 성공 처리 API
export const completeOrder = async (orderId) => {
  const response = await axios.post(`/api/orders/${orderId}/complete`);
  return response.data;
};

//[3] 결제 실패 처리 API
export const failedOrder = async (orderId) => {
  const response = await axios.post(`/api/orders/${orderId}/failed`);
  return response.data;
};

// [4] 배송 요청사항 저장 API
export const saveDeliveryRequest = async (orderData) => {
  const response = await axios.post(`/api/orders/deliveryRequest`, orderData);
  return response.data; // Long 타입: 생성된 주문 ID
};

//[5] 결제 처리 API
export const payOrder = async (orderId, paymentToken) => {
  const response = await axios.post(`/api/orders/${orderId}/pay`, null, {
    params: { paymentToken },
  });
  return response.data;
};

  // 배송지 목록 조회
export const fetchAddresses = async (memberId) => {
  const response = await axios.get(`/api/order/addresses/list`, {
    params: { memberId },
  });
  return response.data;
};

// 배송지 추가
export const addAddress = async (memberId, addressData) => {
  const response = await axios.post(`/api/order/addresses/add`, addressData, {
    params: { memberId },
  });
  return response.data; // 생성된 배송지 ID 반환
};

// 배송지 수정
export const updateAddress = async (addressId, addressData) => {
  await axios.put(`/api/order/addresses/${addressId}/update`, addressData);
};

// 배송지 삭제
export const deleteAddress = async (addressId) => {
  await axios.delete(`/api/order/addresses/${addressId}/delete`);
};

