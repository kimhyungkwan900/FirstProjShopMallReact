import React from "react";
import {
  deleteCartItems,
  updateCartItemQuantity,
  toggleCartItemSelection,
  calculateTotalWithDelivery,
  toggleCartBrandSelection,
} from "../../../api/user/cart/CartApi";
import CartItemRow from "./CartItemRow";
import { useCsrfToken } from "../../../hooks/common/useCsrfToken";

/**
 * BrandGroup 컴포넌트
 * - 같은 브랜드의 장바구니 상품들을 묶어 보여줌
 * - 브랜드 단위로 전체 선택/해제 기능 제공
 * - 개별 상품에 대한 수량 조절, 선택 상태 변경, 삭제 기능 제공
 */
const BrandGroup = ({
  brand,
  items,
  setCartItems,
  loadCart,
  updateTotal
}) => {
  // 브랜드 내 모든 상품이 선택되어 있는지 여부 확인
  const isBrandAllSelected = items.every((item) => item._selected);
  const csrfToken = useCsrfToken();

  /**
   * 브랜드 내 모든 상품의 선택 상태를 변경
   */
  const handleToggleBrandSelect = async (checked) => {
    try {
      await toggleCartBrandSelection(brand, checked, csrfToken); // API 호출
      await loadCart();                               // 장바구니 목록 새로고침
      await updateTotal();                            // 총액 갱신
    } catch (error) {
      console.error("브랜드 전체 선택 API 호출 실패", error);
    }
  };

  /**
   * 개별 상품의 선택 상태를 토글
   */
  const handleToggleItemSelect = async (itemId) => {
    const item = items.find((item) => Number(item.id) === Number(itemId));
    try {
      await toggleCartItemSelection(itemId, !item._selected, csrfToken); // 선택 상태 반전
      await loadCart();
      await updateTotal();
    } catch (error) {
      console.error("상품 선택 상태 업데이트 실패", error);
    }
  };

  /**
   * 개별 상품의 수량을 변경
   */
  const handleUpdateItemQuantity = async (itemId, quantity) => {
    try {
      await updateCartItemQuantity(itemId, quantity, csrfToken);
      await calculateTotalWithDelivery(); // 총액 갱신
      await loadCart();
      await updateTotal();
    } catch (error) {
      console.error("수량 업데이트 실패", error);
      setCartItems((prev) => prev); // 상태 롤백
    }
  };

  /**
   * 개별 상품을 장바구니에서 삭제
   */
  const handleDeleteItem = async (itemId) => {
    try {
      await deleteCartItems(itemId, csrfToken);
      await loadCart();
      await updateTotal();
    } catch (error) {
      console.error("상품 삭제 실패", error);
      setCartItems((prev) => prev); // 상태 롤백
    }
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-2xl shadow-md">
      {/* 브랜드 이름 및 전체 선택 체크박스 영역 */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <input
            type="checkbox"
            checked={isBrandAllSelected}
            onChange={(e) => handleToggleBrandSelect(e.target.checked)}
            className="w-5 h-5 rounded border-gray-400 accent-blue-600"
          />
          <span>{items[0].brandName}</span>
        </label>
      </div>

      {/* 해당 브랜드의 개별 상품 목록 */}
      {items.map((item) => (
        <CartItemRow
          key={item.id}
          item={item}
          onToggleItemSelect={handleToggleItemSelect}
          onUpdateQuantity={handleUpdateItemQuantity}
          onDeleteItem={handleDeleteItem}
        />
      ))}
    </div>
  );
};

export default BrandGroup;