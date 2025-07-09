// api/wishlistApi.js
import axios from 'axios';

// ✅ 특정 사용자 위시리스트 조회 (userId 필수)
export const fetchWishlist = async (userId) => {
  try {
    const response = await axios.get(`/api/wishlist/user/${userId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('위시리스트 조회 실패:', error);
    return [];
  }
};

// ✅ 특정 상품 찜 토글 (userId, productId 전달 필수)
export const toggleWishlistItem = async (productId, userId) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    console.warn('❗️토큰이 없습니다. 로그인 후 시도해주세요.');
    return null;
  }

  try {
    const response = await axios.post(
      '/api/wishlist/toggle',
      { productId, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true  // ✅ 서버가 세션 쿠키/인증 쿠키도 병행한다면 필수
      }
    );
    return response.data;
  } catch (error) {
    console.error('❌ 위시리스트 토글 실패:', error);
    return null;
  }
};
