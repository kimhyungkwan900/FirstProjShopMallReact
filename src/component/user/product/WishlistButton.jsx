import { useContext, useEffect, useState } from 'react'; // React 훅들을 import (상태 관리, 생명주기, context 사용)
import { UserContext } from '../../common/Context/UserContext'; // 로그인된 사용자 정보를 제공하는 UserContext import
import { fetchWishlist, toggleWishlistItem } from '../../../api/user/product/wishlistApi'; // 위시리스트 조회 및 토글 API 함수 import
import { useCsrfToken } from '../../../hooks/common/useCsrfToken';

// 위시리스트 토글 버튼 컴포넌트 (props로 productId를 받음)
const WishlistButton = ({ productId }) => {
  const [liked, setLiked] = useState(false); // 현재 상품이 찜 상태인지 저장하는 상태값
  const { user } = useContext(UserContext); // UserContext에서 현재 로그인 사용자 정보 가져옴
  const userId = user?.id; // 로그인된 사용자의 ID (없을 수도 있으므로 optional chaining 사용)
  const csrfToken = useCsrfToken();

  // 컴포넌트 마운트 또는 productId/userId 변경 시 실행
  useEffect(() => {
    const checkWishlist = async () => {
      if (!userId || !productId) return; // 유저 정보 또는 상품 ID가 없으면 실행하지 않음

      const wishlist = await fetchWishlist(userId); // 서버에서 위시리스트 조회
      const isLiked = wishlist.some(item => item.productId === productId); // 해당 상품이 찜 목록에 있는지 확인
      setLiked(isLiked); // 찜 여부 상태 업데이트
    };

    checkWishlist(); // 위시리스트 확인 함수 실행
  }, [userId, productId]); // userId 또는 productId가 변경되면 실행됨

  // 찜 버튼 클릭 시 호출되는 함수
  const toggleWishlist = async () => {
    try {
      const result = await toggleWishlistItem(productId, userId, csrfToken); // 서버에 찜 상태 토글 요청
      if (result !== null) {
        setLiked(prev => !prev); // 토글 성공 시 현재 liked 상태 반전
      }
    } catch (err) {
      console.error('❌ 위시리스트 토글 실패:', err); // 실패 시 콘솔 출력
    }
  };

  // UI 렌더링: 하트 버튼 (찜 상태에 따라 이모지 다름)
  return (
    <button
      onClick={toggleWishlist} // 버튼 클릭 시 토글 함수 호출
      className="text-xl hover:scale-110 transition-transform duration-150" // 스타일: hover 시 크기 확대, 부드러운 전환
      title={liked ? '위시리스트에서 제거' : '위시리스트에 추가'} // 마우스 오버 시 안내 문구
    >
      {liked ? '💖' : '🤍'} {/* 찜 상태에 따라 하트 아이콘 변경 */}
    </button>
  );
};

export default WishlistButton; // 컴포넌트를 외부에서 사용할 수 있도록 export
