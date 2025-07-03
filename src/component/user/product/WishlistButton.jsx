import { toggleWishlistItem } from '../../../api/user/product/wishlistApi';
import { useState } from 'react';

const WishlistButton = ({ productId, userId }) => {
  const [liked, setLiked] = useState(false);

  const toggleWishlist = async () => {
    try {
      await toggleWishlistItem(productId, userId);  // 💡 userId 함께 전달 필요
      setLiked(prev => !prev);
    } catch (err) {
      console.error('위시리스트 토글 실패', err);
    }
  };

  return (
    <button onClick={toggleWishlist}>
      {liked ? '💖' : '🤍'}
    </button>
  );
};
