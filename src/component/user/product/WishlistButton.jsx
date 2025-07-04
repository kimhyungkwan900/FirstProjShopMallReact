import { toggleWishlistItem } from '../../../api/user/product/wishlistApi';
import { useState } from 'react';

const WishlistButton = ({ productId, userId }) => {
  const [liked, setLiked] = useState(false);

  const toggleWishlist = async () => {
    try {
      await toggleWishlistItem(productId, userId);
      setLiked(prev => !prev);
    } catch (err) {
      console.error('위시리스트 토글 실패', err);
    }
  };

  return (
    <button onClick={toggleWishlist} className="text-xl hover:scale-110 transition-transform duration-150" title={liked ? '위시리스트에서 제거' : '위시리스트에 추가'}>
  {liked ? '💖' : '🤍'}
</button>
  );
};

export default WishlistButton;