import axios from 'axios';

// 장바구니 목록 가져오기
export const fetchCartItems = async () => {
  const res = await axios.get('/api/cart');
  return res.data;
};

// 선택 상태 변경
export const updateCartItemSelected = async (itemId, selected) => {
  await axios.patch(`/api/cart/${itemId}`, { selected });
};

// 수량 변경
export const updateCartItemQuantity = async (itemId, quantity) => {
  await axios.patch(`/api/cart/${itemId}`, { quantity });
};

// 상품 삭제
export const deleteCartItem = async (itemId) => {
  await axios.delete(`/api/cart/${itemId}`);
};
