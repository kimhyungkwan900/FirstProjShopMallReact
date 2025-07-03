// api/wishlistApi.js
import axios from 'axios';

// ✅ 특정 사용자 위시리스트 조회 (userId 필수)
export const fetchWishlist = async (userId) => {
  try {
    const response = await axios.get(`/api/wishlist/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('위시리스트 조회 실패:', error);
    return [];
  }
};

// ✅ 특정 상품 찜 토글 (userId, productId 전달 필수)
export const toggleWishlistItem = async (productId, userId) => {
  const response = await axios.post('/api/wishlist/toggle', {
    productId,
    userId   // ✅ 추가
  });
  return response.data;
};
