import React, { useContext, useEffect, useState } from 'react';
import { fetchWishlist } from '../../../api/user/product/wishlistApi';
import ProductCard from '../../../component/user/product/ProductCard';
import Footer from '../../../component/common/Footer';
import { UserContext } from '../../../component/common/Context/UserContext';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // user가 존재하고 user.id도 있을 때만 실행
    if (!user?.id) return;

    const loadWishlist = async () => {
      try {
        const data = await fetchWishlist(user.id);
        setWishlist(data);
      } catch (error) {
        console.error('위시리스트 가져오기 실패:', error);
      }
    };

    loadWishlist();
  }, [user?.id]); // 의존성 배열에 user?.id 추가

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">찜한 상품 목록</h2>
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
