import axios from "axios";


// axios 인스턴스 생성 (쿠키 포함)
const instance = axios.create({
  baseURL: "http://localhost:8080", // Spring Boot 서버 주소
  withCredentials: true,           // ✅ 쿠키 포함
});

// 사용자 정보 불러오기
export const fetchUserInfo = () =>
  instance.get("/api/auth/me");

// 장바구니에 상품 추가
export const addCartItem = (memberId, productId, quantity) =>
  instance.post(`/api/cart/items/${productId}`, null, {
    params: { memberId, quantity },
  });

// 장바구니 항목 가져오기
export const fetchCartItems = (memberId) =>
  axios.get(`/api/cart/items`,
    {params : {memberId},
  });

// 장바구니 항목 삭제
export const deleteCartItems = (memberId, itemId) =>
  axios.delete(`/api/cart/items/${itemId}`,{
    params : {memberId},
  });


// 장바구니 항목 수량 변경
export const updateCartItemQuantity = (memberId, itemId, quantity) =>
  axios.put(`/api/cart/items/${itemId}`, null,{
    params : {memberId, quantity},
  });

// 선택 여부 토글
export const toggleCartItemSelection = (memberId, itemId, isSelected) =>
  axios.patch(`/api/cart/${itemId}/select`,null,{
    params : {memberId, isSelected},
  });


//브랜드별 선택 여부 토글
export const toggleBrandItemsSelection = (memberId, brand, isSelected) =>{
  axios.patch(`/api/cart/items/brand`,{
    params : {memberId, brand, isSelected}
  })
}

//브랜드별 상품 전체 삭제 버튼
export const deleteBrandItems = (memberId, brand) =>
  axios.delete(`/api/cart/items/brand`, {
    params: { memberId, brand },
  });

// 선택된 항목만 삭제
export const deleteSelectedItems = (memberId, itemId) =>
  axios.delete(`/api/cart/items/selected`,{
    params : {memberId, itemId}
  });

// 선택된 항목 총 가격 계산
export const calculateTotalWithDelivery = (memberId) =>
  axios.get(`/api/cart/total-with-deli`,{
    params : {memberId}
  });

// 위시리스트로 이동
export const moveCartItemToWishlist = (memberId, cartItemId) =>
  axios.post(`/api/cart/items/whishlist/${cartItemId}`, null,{
    params : {memberId},
  });

