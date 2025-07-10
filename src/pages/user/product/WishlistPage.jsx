import React, { useContext, useEffect, useState } from 'react';
import { fetchWishlist } from '../../../api/user/product/wishlistApi';
import ProductCard from '../../../component/user/product/ProductCard';
import Footer from '../../../component/common/Footer';
import { UserContext } from '../../../component/common/Context/UserContext';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.id) return;

    const loadWishlist = async () => {
      try {
        const data = await fetchWishlist(user.id);
        setWishlist(data);
      } catch (error) {
        console.error('❌ 위시리스트 가져오기 실패:', error);
      }
    };

    loadWishlist();
  }, [user?.id]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">💘 찜한 상품 목록</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">찜한 상품이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlist.map(product => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default WishlistPage;
