import axios from "axios";

// ✅ axios 공통 인스턴스 생성 (쿠키 자동 포함 + baseURL)
const axiosInstance = axios.create({
  withCredentials: true, // ✅ 이거 중요
});


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
export const toggleCartItemSelection = async (itemId, isSelected) => {
  const res = await axiosInstance.put(`/api/cart/items/${itemId}/select`, null, {
    params: { isSelected },
  });
  return res;
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
  return axiosInstance.put(`/api/cart/items/refresh-stock`);
};

// ✅ 10. 장바구니 항목을 위시리스트로 이동
export const moveCartItemToWishlist = (cartItemId) => {
  return axiosInstance.post(`/api/cart/items/wishlist/${cartItemId}`);
};

// ✅ 11. 재입고 알림 신청
export const requestRestockAlarm = (itemsId) => {
  return axiosInstance.post(`/api/cart/items/${itemsId}/restockAlarm`);
};

// ✅ 11. 재입고 알림 취소 신청
export const cancelRestockAlarm = (itemsId) => {
  return axiosInstance.post(`/api/cart/items/${itemsId}/restockAlarm/cancel`);
};

// ✅ 12. 재입고 알림 목록
export const getRestockAlarmList = () => {
  return axiosInstance.get(`/api/cart/items/restockAlarm/list`);
};

// ✅ 13. 브랜드별 전체 선택
export const toggleCartBrandSelection = (brandName, isSelected) => {
  return axiosInstance.put(`/api/cart/items/select-brand/${encodeURIComponent(brandName)}`,
  null,
  { params: { isSelected } }
);

};

// ✅ 14. 장바구니 항목 전체 선택 
export const toggleCartAllSelection = (isSelected) => {
  return axiosInstance.put(`/api/cart/items/select-all`, null, {
    params: { isSelected },
  });
};
