import axios from 'axios'; // axios를 import하여 HTTP 요청을 보낼 수 있게 함
import { withCsrfEmpty } from '../../../utils/common/withCsrf';

// ✅ 특정 사용자 위시리스트 조회 (userId 필수)
export const fetchWishlist = async (userId) => {
  try {
    // GET 요청으로 해당 사용자의 위시리스트 데이터를 서버에서 조회
    const response = await axios.get(`/api/wishlist/user/${userId}`, {
      withCredentials: true, // 쿠키 기반 인증정보(JWT, 세션 등)를 함께 보냄
    });
    return response.data; // 응답 데이터(위시리스트 배열 등)를 반환
  } catch (error) {
    console.error('❌ 위시리스트 조회 실패:', error); // 에러 발생 시 콘솔에 출력
    return []; // 실패 시 빈 배열 반환 (안전하게 처리)
  }
};

// ✅ 특정 상품 찜 토글
export const toggleWishlistItem = async (productId, userId, csrfToken) => {
  try {
    // POST 요청으로 서버에 찜 상태 토글 요청 (찜 추가 또는 취소)
    const response = await axios.post(
      '/api/wishlist/toggle', // API 엔드포인트
      { productId, userId },  // 요청 바디에 productId와 userId 포함
      withCsrfEmpty(csrfToken)
    );
    return response.data; // 서버로부터 받은 응답 데이터 반환 (예: 상태 메시지)
  } catch (error) {
    console.error('❌ 위시리스트 토글 실패:', error); // 에러 발생 시 로그 출력
    return null; // 실패 시 null 반환
  }
};
