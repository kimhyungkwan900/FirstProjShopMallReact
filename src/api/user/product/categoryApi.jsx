import axios from 'axios';

// 모든 카테고리 목록을 가져오는 함수 정의
export const fetchAllCategories = async () => {
  // GET 요청을 /api/categories 경로로 보내 카테고리 데이터를 요청함
  const response = await axios.get('/api/categories');
  
  // 서버로부터 받은 응답 객체 중 실제 데이터(payload)만 반환
  return response.data;
};
