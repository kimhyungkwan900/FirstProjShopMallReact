import React, { useContext, useEffect, useState } from 'react';
import { fetchWishlist } from '../../../api/user/product/wishlistApi';
import ProductCard from '../../../component/user/product/ProductCard';
import Footer from '../../../component/common/Footer';
import { UserContext } from '../../../component/common/Context/UserContext';
import MainHeader from '../../../features/common/Header/MainHeader';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.id) return;

    const loadWishlist = async () => {
      try {
        const data = await fetchWishlist(user.id);
        const formatted = data.map(item => ({
          id: item.productId,
          name: item.productName,
          brandName: item.brandName,
          price: item.price,
          sellStatus: item.sellStatus,
          images: item.images || [],
        }));
        setWishlist(formatted);
      } catch (error) {
        console.error('❌ 위시리스트 가져오기 실패:', error);
      }
    };

    loadWishlist();
  }, [user?.id]);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* ✅ 상단 헤더 */}
      <MainHeader />

      {/* ✅ 본문 */}
      <main className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800">💘 찜한 상품</h2>
          <p className="text-gray-500 mt-2">내가 관심 있는 상품들을 한눈에 확인해보세요</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">찜한 상품이 없습니다 😥</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
