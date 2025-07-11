import React, { useContext, useEffect, useState } from 'react';
import { fetchWishlist } from '../../../api/user/product/wishlistApi';
import ProductCard from '../../../component/user/product/ProductCard';
import Footer from '../../../component/common/Footer';
import { UserContext } from '../../../component/common/Context/UserContext';
import MainHeader from '../../../features/common/Header/MainHeader';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]); // 위시리스트 상태 정의 (초기값은 빈 배열)
  const { user } = useContext(UserContext); // Context를 통해 로그인한 사용자 정보 불러오기

  useEffect(() => {
    // 사용자가 로그인하지 않았을 경우 함수 실행 안 함
    if (!user?.id) return;

    // 위시리스트 데이터 불러오는 함수
    const loadWishlist = async () => {
      try {
        const data = await fetchWishlist(user.id);

        // ProductCard 컴포넌트에 맞게 데이터 형식 가공
        const formatted = data.map(item => ({
          id: item.productId,             // 상품 ID
          name: item.productName,         // 상품 이름
          brandName: item.brandName,      // 브랜드 이름
          price: item.price,              // 가격
          sellStatus: item.sellStatus,    // 판매 상태
          images: item.images || [],      // 이미지 배열 (없으면 빈 배열로 대체)
        }));

        // 상태 업데이트
        setWishlist(formatted);
      } catch (error) {
        console.error('❌ 위시리스트 가져오기 실패:', error);
      }
    };

    loadWishlist(); // 위시리스트 불러오기 실행
  }, [user?.id]);// user.id가 바뀌면 다시 실행됨

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
