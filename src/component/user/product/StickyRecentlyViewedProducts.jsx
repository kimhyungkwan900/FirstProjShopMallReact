import React, { useEffect, useState } from 'react';
import { getRecentlyViewedProducts, clearRecentlyViewedProducts } from '../../../utils/user/product/localStorageUtil';
import { Link } from 'react-router-dom';

// 스크롤 고정형 최근 본 상품 컴포넌트 정의
const StickyRecentlyViewedProducts = () => {
  // 최근 본 상품 목록 상태
  const [recentProducts, setRecentProducts] = useState([]);
  // 상품 리스트 박스 보임 여부 상태
  const [visible, setVisible] = useState(true);
  // 숨김 상태 여부 (닫기 버튼 클릭 후 열기 버튼 표시 여부 판단용)
  const [isHidden, setIsHidden] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 로컬스토리지에서 최근 본 상품 가져오기
  useEffect(() => {
    const data = getRecentlyViewedProducts(); // 로컬스토리지에서 가져오기
    setRecentProducts(data.slice(0, 3));      // 최대 3개까지만 보여줌
  }, []);

  // 전체 삭제 버튼 클릭 시 실행
  const handleClear = () => {
    clearRecentlyViewedProducts(); // 로컬스토리지에서 삭제
    setRecentProducts([]);         // 상태 초기화
  };

  // 열기 버튼 클릭 시 실행
  const handleShow = () => {
    const data = getRecentlyViewedProducts();
    setRecentProducts(data.slice(0, 3)); // 다시 가져오기
    setVisible(true);  // 보이게 설정
    setIsHidden(false); // 숨김 상태 해제
  };

  // 처음 렌더링 시 visible=false이고 isHidden=false면 아무것도 렌더링하지 않음
  if (!visible && !isHidden) return null;

  return (
    <>
      {/* 최근 본 상품 박스 - 열려있는 상태 */}
      {visible && (
        <div className="fixed right-4 bottom-24 w-60 bg-white border border-gray-300 shadow-xl rounded-xl z-50 p-4 space-y-4 transition-opacity duration-300 ease-in-out hidden lg:block">
          {/* 헤더 영역 */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-bold text-gray-700">👀 최근 본 상품</span>
            <button
              className="text-gray-400 hover:text-gray-700 text-sm"
              onClick={() => {
                setVisible(false); // 닫기
                setIsHidden(true); // 숨김 상태 유지
              }}
            >
              ✕
            </button>
          </div>

          {/* 최근 본 상품 목록 */}
          {recentProducts.length > 0 ? (
            <div className="space-y-3">
              {recentProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`} // 상세 페이지 이동
                  className="block hover:bg-gray-50 p-1 rounded-md"
                >
                  {/* 대표 이미지 또는 기본 이미지 */}
                  <img
                    src={product.images?.[0]?.imgUrl || '/no-image.jpg'}
                    alt={product.name}
                    className="w-full h-24 object-cover rounded-md mb-1"
                  />
                  {/* 상품명 (너무 길면 생략) */}
                  <p className="text-xs text-gray-700 truncate">{product.name}</p>
                </Link>
              ))}
            </div>
          ) : (
            // 상품이 없을 경우 메시지 표시
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

      {/* 닫힌 상태에서 열기 버튼 표시 */}
      {!visible && isHidden && (
        <button
          onClick={handleShow} // 다시 열기
          className="fixed right-4 bottom-8 z-40 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md text-sm hidden lg:block"
        >
          최근 본 상품 열기
        </button>
      )}
    </>
  );
};

export default StickyRecentlyViewedProducts;
