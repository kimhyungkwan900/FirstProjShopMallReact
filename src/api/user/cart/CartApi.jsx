import axios from "axios";
import { withCsrf, withCsrfEmpty } from "../../../utils/common/withCsrf";

// ✅ axios 공통 인스턴스 생성 (쿠키 자동 포함 + baseURL)
const axiosInstance = axios.create({
  withCredentials: true, // ✅ 이거 중요
});

// ✅ 1. 장바구니에 상품 추가
export const addCartItem = (productId, quantity, csrfToken) => {
  return axiosInstance.post(`/api/cart/items/${productId}`, null, withCsrf({ params: { quantity } }, csrfToken));
};

// ✅ 2. 장바구니에서 특정 항목 삭제
export const deleteCartItems = (itemId, csrfToken) => {
  return axiosInstance.delete(`/api/cart/items/${itemId}`, withCsrfEmpty(csrfToken));
};

// ✅ 3. 사용자 장바구니 항목 전체 조회
export const fetchCartItems = () => {
  return axiosInstance.get(`/api/cart/items`);
};

// ✅ 4. 장바구니 항목 수량 수정
export const updateCartItemQuantity = (itemId, quantity, csrfToken) => {
  return axiosInstance.put(`/api/cart/items/${itemId}`, null, withCsrf({ params: { quantity } }, csrfToken));
};

// ✅ 5. 장바구니 항목 선택/해제
export const toggleCartItemSelection = async (itemId, isSelected, csrfToken) => {
  const res = await axiosInstance.put(`/api/cart/items/${itemId}/select`, null, withCsrf({ params: { isSelected } }, csrfToken));
  return res;
};


// ✅ 6. 장바구니 전체 비우기
export const clearCart = (csrfToken) => {
  return axiosInstance.delete(`/api/cart/items`, withCsrfEmpty(csrfToken));
};

// ✅ 7. 선택된 항목만 삭제
export const deleteSelectedItems = (csrfToken) => {
  return axiosInstance.delete(`/api/cart/items/selected`, withCsrfEmpty(csrfToken));
};

// ✅ 8. 선택된 항목 총 가격과 배송비 계산
export const calculateTotalWithDelivery = () => {
  return axiosInstance.get(`/api/cart/total-with-deli`);
};

// ✅ 9. 장바구니 품절 상태 자동 갱신
export const refreshCartStockStatus = (csrfToken) => {
  return axiosInstance.put(`/api/cart/items/refresh-stock`,null, withCsrfEmpty(csrfToken));
};

// ✅ 10. 장바구니 항목을 위시리스트로 이동
export const moveCartItemToWishlist = (cartItemId, csrfToken) => {
  return axiosInstance.post(`/api/cart/items/wishlist/${cartItemId}`,null, withCsrfEmpty(csrfToken));
};

// ✅ 11. 재입고 알림 신청
export const requestRestockAlarm = (itemsId, csrfToken) => {
  return axiosInstance.post(`/api/cart/items/${itemsId}/restockAlarm`,null, withCsrfEmpty(csrfToken));
};

// ✅ 11. 재입고 알림 취소 신청
export const cancelRestockAlarm = (itemsId, csrfToken) => {
  return axiosInstance.post(`/api/cart/items/${itemsId}/restockAlarm/cancel`,null, withCsrfEmpty(csrfToken));
};


// ✅ 12. 재입고 알림 목록
export const getRestockAlarmList = () => {
  return axiosInstance.get(`/api/cart/items/restockAlarm/list`);
};

// ✅ 13. 재입고 알림 상태
export const IsRequestRestockAlarm = (productId) => {
  return axiosInstance.get(`/api/cart/items/${productId}/restockAlarm/status`);
};


// ✅ 14. 브랜드별 전체 선택
export const toggleCartBrandSelection = (brandName, isSelected, csrfToken) => {
  return axiosInstance.put(`/api/cart/items/select-brand/${encodeURIComponent(brandName)}`,
  null, withCsrf({ params: { isSelected } }, csrfToken));

};

// ✅ 15. 장바구니 항목 전체 선택 
export const toggleCartAllSelection = (isSelected, csrfToken) => {
  return axiosInstance.put(`/api/cart/items/select-all`, null, withCsrf({ params: { isSelected } }, csrfToken));
};
