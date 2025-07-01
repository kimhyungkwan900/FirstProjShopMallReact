import React, { useState } from 'react';

const WishlistButton = ({ productId }) => {
  const [liked, setLiked] = useState(false);
  const toggleWishlist = () => {
    setLiked(prev => !prev);
    // API 요청 또는 상태 업데이트 추가 가능
  };

  return (
    <button className={`wishlist-button ${liked ? 'liked' : ''}`} onClick={toggleWishlist}>
      {liked ? '💖' : '🤍'}
    </button>
  );
};

export default WishlistButton;