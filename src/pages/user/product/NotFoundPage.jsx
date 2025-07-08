import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../component/common/Footer';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* 메인 콘텐츠 */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8">
          <h1 className="text-7xl font-extrabold text-blue-600">404</h1>
          <p className="text-2xl mt-4 font-semibold">페이지를 찾을 수 없습니다</p>
          <p className="text-gray-500 mt-2">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있어요.
          </p>
        </div>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-600 transition duration-200"
        >
          🏠 홈페이지로 돌아가기
        </Link>
      </main>

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
};

export default NotFoundPage;
