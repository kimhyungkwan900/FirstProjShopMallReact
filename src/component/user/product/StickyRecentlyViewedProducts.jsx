import React, { useEffect, useState } from 'react';
import { getRecentlyViewedProducts, clearRecentlyViewedProducts } from '../../../utils/user/product/localStorageUtil';
import { Link } from 'react-router-dom';

const StickyRecentlyViewedProducts = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [visible, setVisible] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const data = getRecentlyViewedProducts();
    setRecentProducts(data.slice(0, 3));
  }, []);

  const handleClear = () => {
    clearRecentlyViewedProducts();
    setRecentProducts([]); // ❗️ 목록만 비우기
  };

  const handleShow = () => {
    const data = getRecentlyViewedProducts();
    setRecentProducts(data.slice(0, 3));
    setVisible(true);
    setIsHidden(false);
  };

  if (!visible && !isHidden) return null;

  return (
    <>
      {visible && (
        <div className="fixed right-4 bottom-24 w-60 bg-white border border-gray-300 shadow-xl rounded-xl z-50 p-4 space-y-4 transition-opacity duration-300 ease-in-out hidden lg:block">
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-bold text-gray-700">👀 최근 본 상품</span>
            <button
              className="text-gray-400 hover:text-gray-700 text-sm"
              onClick={() => {
                setVisible(false);
                setIsHidden(true);
              }}
            >
              ✕
            </button>
          </div>

          {/* 상품 목록 */}
          {recentProducts.length > 0 ? (
            <div className="space-y-3">
              {recentProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="block hover:bg-gray-50 p-1 rounded-md"
                >
                  <img
                    src={product.images?.[0]?.imgUrl || '/no-image.jpg'}
                    alt={product.name}
                    className="w-full h-24 object-cover rounded-md mb-1"
                  />
                  <p className="text-xs text-gray-700 truncate">{product.name}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center">최근 본 상품이 없습니다</p>
          )}

          {/* 전체 삭제 버튼 */}
          <button
            className="text-[12px] text-red-500 hover:underline mt-2"
            onClick={handleClear}
          >
            전체 삭제
          </button>
        </div>
      )}

      {/* 열기 버튼 */}
      {!visible && isHidden && (
        <button
          onClick={handleShow}
          className="fixed right-4 bottom-8 z-40 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md text-sm hidden lg:block"
        >
          최근 본 상품 열기
        </button>
      )}
    </>
  );
};

export default StickyRecentlyViewedProducts;
