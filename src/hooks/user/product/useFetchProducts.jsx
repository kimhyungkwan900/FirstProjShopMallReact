import { useState, useEffect } from 'react';
import axios from 'axios';

// 상품 데이터를 비동기로 가져오는 커스텀 훅 정의
// 매개변수: url - 데이터를 요청할 API 엔드포인트
const useFetchProducts = (url) => {
  // 상품 목록 상태
  const [products, setProducts] = useState([]);
  // 로딩 상태 (데이터 요청 중인지 여부)
  const [loading, setLoading] = useState(true);
  // 에러 상태 (요청 실패 시 에러 정보 저장)
  const [error, setError] = useState(null);

  // 컴포넌트가 처음 렌더링되거나, url이 바뀔 때마다 실행
  useEffect(() => {
    // 비동기 요청 함수 정의
    const fetchData = async () => {
      try {
        setLoading(true); // 요청 시작: 로딩 상태 true
        const response = await axios.get(url); // GET 요청 보내기
        // 응답의 content 필드가 존재하면 products에 설정, 없으면 빈 배열
        setProducts(response.data.content || []);
      } catch (err) {
        // 오류 발생 시 error 상태에 저장
        setError(err);
      } finally {
        // 요청이 완료되면 (성공/실패 관계없이) 로딩 종료
        setLoading(false);
      }
    };

    // 요청 실행
    fetchData();
  }, [url]); // 의존성 배열: url이 바뀔 때마다 재요청

  // 훅이 반환하는 값: 상품 목록, 로딩 여부, 에러 정보
  return { products, loading, error };
};

export default useFetchProducts;
