import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">페이지를 찾을 수 없습니다.</p>
      <Link
        to="/products"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
      >
        상품 페이지로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
