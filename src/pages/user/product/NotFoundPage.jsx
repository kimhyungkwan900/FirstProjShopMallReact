import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../component/common/Footer';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 text-center bg-gray-50">
      <div className="mb-8">
        <h1 className="text-7xl font-extrabold text-blue-600">404</h1>
        <p className="text-2xl mt-2 text-gray-800 font-semibold">페이지를 찾을 수 없습니다</p>
        <p className="text-gray-500 mt-1">요청하신 페이지가 존재하지 않거나 이동되었을 수 있어요.</p>
      </div>

      <Link
        to="/products"
        className="inline-block mt-4 px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-600 transition duration-200 mb-20"
      >
        🛍️ 상품 페이지로 돌아가기
      </Link>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
