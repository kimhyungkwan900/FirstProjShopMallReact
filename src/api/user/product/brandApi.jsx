import axios from 'axios';

// 모든 브랜드 목록을 가져오는 함수 정의
export const fetchAllBrands = async () => {
  // GET 요청을 /api/brands 경로로 보내 브랜드 데이터를 요청함
  const response = await axios.get('/api/brands');
  
  // 서버로부터 받은 응답 객체 중 실제 데이터(payload)만 반환
  return response.data;
};
