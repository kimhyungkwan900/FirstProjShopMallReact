import React, { useContext, useEffect, useState } from 'react';
import { fetchWishlist } from '../../../api/user/product/wishlistApi';
import ProductCard from '../../../component/user/product/ProductCard';
import Footer from '../../../component/common/Footer';
import { UserContext } from '../../../component/common/Context/UserContext';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const {user} = useContext(UserContext);
  useEffect(() => {
    const loadWishlist = async () => {
      const userId = user?.id; //형관님한테 받아와야 함, id(pk)
      const data = await fetchWishlist(userId);
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
      
      <Footer />
    </div>
  );
};

export default WishlistPage;