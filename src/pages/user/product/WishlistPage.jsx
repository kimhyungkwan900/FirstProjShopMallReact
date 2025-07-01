import React, { useEffect, useState } from 'react';
import { fetchWishlist } from '../../../api/user/product/wishlistApi';
import ProductCard from '../../../component/user/product/ProductCard';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const loadWishlist = async () => {
      const data = await fetchWishlist();
      setWishlist(data);
    };
    loadWishlist();
  }, []);

  return (
    <div>
      <h2>찜한 상품 목록</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;