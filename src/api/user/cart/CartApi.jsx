import axios from "axios";

// ✅ axios 공통 인스턴스 생성 (쿠키 자동 포함 + baseURL)
const axiosInstance = axios.create({
  withCredentials: true,           // ✅ 모든 요청에 쿠키 포함
});

// ✅ 세션 만료 시 자동 리다이렉트 처리
axiosInstance.interceptors.response.use(
  (response) => response, // 성공 시 그대로 반환
  (error) => {
    if (
      error.response &&
      error.response.status === 302 &&
      error.response.headers.location === "/login"
    ) {
      window.location.href = "/login"; // ✅ 프론트 로그인 페이지로 이동
    }
    return Promise.reject(error);
  }
);


// ✅ 1. 장바구니에 상품 추가
export const addCartItem = (productId, quantity) => {
  return axiosInstance.post(`/api/cart/items/${productId}`, null, {
    params: { quantity }
  });
};

// ✅ 2. 장바구니에서 특정 항목 삭제
export const deleteCartItems = (itemId) => {
  return axiosInstance.delete(`/api/cart/items/${itemId}`);
};

// ✅ 3. 사용자 장바구니 항목 전체 조회
export const fetchCartItems = () => {
  return axiosInstance.get(`/api/cart/items`);
};

// ✅ 4. 장바구니 항목 수량 수정
export const updateCartItemQuantity = (itemId, quantity) => {
  return axiosInstance.put(`/api/cart/items/${itemId}`, null, {
    params: { quantity }
  });
};

// ✅ 5. 장바구니 항목 선택/해제
export const toggleCartItemSelection = (itemId, isSelected) => {
  return axiosInstance.patch(`/api/cart/items/${itemId}/select`, null, {
    params: { isSelected }
  });
};

// ✅ 6. 장바구니 전체 비우기
export const clearCart = () => {
  return axiosInstance.delete(`/api/cart/items`);
};

// ✅ 7. 선택된 항목만 삭제
export const deleteSelectedItems = () => {
  return axiosInstance.delete(`/api/cart/items/selected`);
};

// ✅ 8. 선택된 항목 총 가격과 배송비 계산
export const calculateTotalWithDelivery = () => {
  return axiosInstance.get(`/api/cart/total-with-deli`);
};

// ✅ 9. 장바구니 품절 상태 자동 갱신
export const refreshCartStockStatus = () => {
  return axiosInstance.patch(`/api/cart/items/refresh-stock`);
};

// ✅ 10. 장바구니 항목을 위시리스트로 이동
export const moveCartItemToWishlist = (cartItemId) => {
  return axiosInstance.post(`/api/cart/items/wishlist/${cartItemId}`);
};

// ✅ 11. 재입고 알림 신청
export const requestRestockAlarm = (itemsId) => {
  return axiosInstance.post(`/api/cart/items/${itemsId}/restockAlarm`);
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
