import axios from "axios";
  
  
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
