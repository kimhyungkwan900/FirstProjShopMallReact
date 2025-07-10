import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../common/Context/UserContext';
import { fetchWishlist, toggleWishlistItem } from '../../../api/user/product/wishlistApi';

const WishlistButton = ({ productId }) => {
  const [liked, setLiked] = useState(false);
  const { user } = useContext(UserContext);
  const userId = user?.id;

  useEffect(() => {
    const checkWishlist = async () => {
      if (!userId || !productId) return;

      const wishlist = await fetchWishlist(userId);
      const isLiked = wishlist.some(item => item.productId === productId);
      setLiked(isLiked);
    };

    checkWishlist();
  }, [userId, productId]);

  const toggleWishlist = async () => {
    try {
      const result = await toggleWishlistItem(productId, userId);
      if (result !== null) {
        setLiked(prev => !prev);
      }
    } catch (err) {
      console.error('❌ 위시리스트 토글 실패:', err);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className="text-xl hover:scale-110 transition-transform duration-150"
      title={liked ? '위시리스트에서 제거' : '위시리스트에 추가'}
    >
      {liked ? '💖' : '🤍'}
    </button>
  );
};

export default WishlistButton;
