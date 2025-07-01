// api/wishlistApi.js
import axios from 'axios';

// 위시리스트 전체 조회
export const fetchWishlist = async () => {
  try {
    const response = await axios.get('/api/wishlist');
    return response.data;
  } catch (error) {
    console.error('위시리스트 조회 실패:', error);
    return [];
  }
};

// 특정 상품 찜 토글 (추가/삭제)
export const toggleWishlistItem = async (productId) => {
  try {
    const response = await axios.post('/api/wishlist/toggle', { productId });
    return response.data;
  } catch (error) {
    console.error('찜 토글 실패:', error);
    return null;
  }
};