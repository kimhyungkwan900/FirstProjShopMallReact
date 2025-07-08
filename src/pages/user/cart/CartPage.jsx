import React, { useCallback,useEffect, useState } from "react";
import {
  fetchCartItems,                // 장바구니 목록 조회
  deleteCartItems,                // 항목 삭제
  updateCartItemQuantity,        // 수량 변경
  toggleCartItemSelection,       // 항목 선택/해제
  deleteSelectedItems,           // 선택 항목 삭제
  calculateTotalWithDelivery,    // 총액 계산
  toggleBrandItemsSelection,     // 브랜드 선택/해제
  moveCartItemToWishlist,        // 위시리스트로 이동
} from "../../../api/user/cart/CartApi";

import BrandGroup from "../../../component/user/cart/BrandGroup";

const CartPage = ({ memberId }) => {
  const [cartItems, setCartItems] = useState([]); // 장바구니 항목
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태
  const [total, setTotal] = useState({ // 총액
    totalProductPrice: 0,//나중에 수정
    deliveryFee: 0,
    grandTotal: 0,
  });

  // 장바구니 불러오기
const loadCart = useCallback(async () => {
  try {
    const response = await fetchCartItems(memberId);
    const items = Array.isArray(response.data) ? response.data : [];
    setCartItems(items);
  } catch (error) {
    console.error("장바구니 불러오기 실패", error);
  }
}, [memberId]); // ✅ 의존성 배열에 memberId만 추가

useEffect(() => {
  loadCart(); // 함수 참조가 고정되니 경고 사라짐
}, [loadCart]);

  // 총액 계산
  const calculateSelectedTotal = async () => {
      const response = await calculateTotalWithDelivery(memberId);
      setTotal(response.data);
    
  };

  // 개별 항목 선택/해제
  const handleToggleSelectItem = async (itemId, isSelected) => {
    // 해당 상품의 선택 상태를 서버에 반영
    await toggleCartItemSelection(memberId, itemId, isSelected);
    await loadCart(); // 변경 후 장바구니 데이터 새로고침
  };

  // 브랜드별 항목 선택/해제
  const handleToggleSelectBrand = async (brand, isSelected) => {
    // 해당 브랜드의 모든 상품 선택 상태를 서버에 반영
    await toggleBrandItemsSelection(memberId, brand, isSelected);
    await loadCart(); // 변경 후 장바구니 데이터 새로고침
  };

  // 전체 항목 선택/해제
  const handleSelectAll = async () => {
    const newSelectAll = !selectAll; // 전체 선택 상태 반전
    // 모든 상품의 선택 상태를 서버에 업데이트
    for (let item of cartItems) {
      await toggleCartItemSelection(memberId, item.id, newSelectAll);
    }
    setSelectAll(newSelectAll); // 전체 선택 상태 업데이트
    await loadCart(); // 변경 후 장바구니 데이터 새로고침
  };

  // 개별 항목 삭제
  const handleDeleteCartItem = async (itemId) => {
    // 해당 상품을 장바구니에서 삭제
    await deleteCartItems(memberId, itemId);
    await loadCart(); // 삭제 후 장바구니 데이터 새로고침
  };

  //선택된 항목만 삭제
  const handleDeleteSelectedCartItem = async(itemId) =>{
    await deleteSelectedItems(memberId, itemId);
    await loadCart();
  }

  // 개별 항목 수량 변경
  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return; // 수량 1 미만으로는 변경 불가
    // 서버에 수량 변경 요청
    await updateCartItemQuantity(memberId, itemId, quantity);
    await loadCart(); // 변경 후 장바구니 데이터 새로고침
  };

  // 위시리스트로 이동
  const handleMoveToItemToWishlist = async (cartItemId) => {
    await moveCartItemToWishlist(memberId, cartItemId);
    await loadCart();
  };


  // 브랜드별 그룹화
  const groupByBrand = (items) => {
    const grouped = {};
    items.forEach((item) => {
      if (!grouped[item.brand]) grouped[item.brand] = [];
      grouped[item.brand].push(item);
    });
    return grouped;
  };

  return (
      <div className="flex justify-center bg-gray-50 min-h-screen px-4">
        <div className="flex w-full max-w-7xl gap-6">

          {/* 왼쪽: 장바구니 리스트 */}
          <div className="basis-[62%] min-w-[600px] bg-white rounded-6xl shadow-sm flex flex-col mt-6">
            {/* 🛒 헤더 */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-4 py-3">
              <h1 className="text-[36px] font-bold flex items-center gap-2">
                🛒 장바구니
              </h1>
            </div>

            {/* 리스트 영역 */}
            <div className="flex-1 overflow-y-auto px-4 py-6" style={{ maxHeight: "calc(100vh - 64px)" }}>
              {cartItems.length === 0 ? (
                <p className="text-[20px] text-center text-gray-500 mt-8">
                  장바구니가 비어 있습니다.
                </p>
              ) : (
                <>
                  {/* 전체 선택 & 삭제 */}
                  <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center space-x-2 text-[14px]">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-800">전체 선택</span>
                    </label>
                    <button
                      onClick={handleDeleteSelectedCartItem}
                      className="text-[14px] text-red-500"
                    >
                      선택 항목 삭제
                    </button>
                  </div>

                  {/* 브랜드별 그룹 */}
                  {Object.entries(groupByBrand(cartItems)).map(([brand, items], index, array) => (
                    <div key={brand}>
                      <BrandGroup
                        brand={brand}
                        items={items}
                        handleToggleSelectBrand={handleToggleSelectBrand}
                        handleToggleSelectItem={handleToggleSelectItem}
                        handleUpdateQuantity={handleUpdateQuantity}
                        handleDeleteCartItem={handleDeleteCartItem}
                        handleMoveToItemToWishlist={handleMoveToItemToWishlist}
                      />
                      {/* 브랜드 구분선 */}
                      {index !== array.length - 1 && (
                        <div className="border-t border-gray-200 my-6"></div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* 오른쪽: 총액 카드 */}
          <div className="basis-[38%] min-w-[280px]">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-[18px] font-bold mb-4">구매 금액</h2>

                <div className="flex justify-between mb-2 text-[14px]">
                  <span>상품 합계</span>
                  <span>{total.totalProductPrice.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between mb-2 text-[14px]">
                  <span>배송비</span>
                  <span>{total.deliveryFee.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between mb-4 text-[16px] font-bold">
                  <span>총액</span>
                  <span className="text-green-600">
                    {calculateSelectedTotal} 원
                  </span>
                </div>

                <button className="w-full bg-blue-500 text-white text-[14px] py-2 rounded-xl">
                  상품 주문하기
                  {/* 주문하기로 이동하기 */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default CartPage;


