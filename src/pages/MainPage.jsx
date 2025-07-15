import { useEffect, useState } from "react";
import MainHeader from "../features/common/Header/MainHeader";
import BannerSlider from "../component/common/Banner/BannerSlider";
import PopularProducts from "../component/user/product/PopularProducts";
import MainFooter from "../features/common/Footer/MainFooter";
import RecentProducts from "../component/user/product/RecentProducts";
import Footer from "../component/common/Footer";

const MainPage = () => {
  const [banner, setBanners] = useState([]);

  useEffect(() => {
    fetch("/api/banner/main")
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .catch((err) => console.error("배너 로딩 실패: ", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <MainHeader />

      {/* 메인 배너 */}
      <section className="w-full max-w-screen-xl mx-auto px-4 pt-6">
        <BannerSlider images={banner} />
      </section>

      {/* 인기 상품 섹션 */}
      <section className="max-w-screen-xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">인기 상품</h2>
        <PopularProducts />
      </section>

      {/* 최신 상품 섹션 */}
      <section className="max-w-screen-xl mx-auto px-4 py-12 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">최신 등록 상품</h2>
        <RecentProducts />
      </section>

      {/* 푸터 */}
      <Footer /> 
    </div>
  );
};

export default MainPage;
