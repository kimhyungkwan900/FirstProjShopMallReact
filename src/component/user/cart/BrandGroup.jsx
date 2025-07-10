import React from "react";
import {
  deleteCartItems,
  updateCartItemQuantity,
  toggleCartItemSelection,
  calculateTotalWithDelivery,
  toggleCartBrandSelection,
} from "../../../api/user/cart/CartApi";
import CartPage from "../../../pages/user/cart/CartPage";

const BrandGroup = ({
  brand,
  items,
  setCartItems,
  loadCart,
  updateTotal,
}) => {
  // ✅ 브랜드 내 모든 상품 선택 여부
  const isBrandAllSelected = items.every((item) => item.isSelected);

  // ✅ 브랜드 전체 선택/해제
  const handleToggleBrandSelect = async () => {
  try {
    await toggleCartBrandSelection(brand, !isBrandAllSelected);
    await loadCart();
    await updateTotal();
  } catch (error) {
    console.error("❌ 브랜드 전체 선택 API 호출 실패", error);
  }
};

  // ✅ 개별 상품 선택/해제
  const handleToggleItemSelect = async (itemId) => {
    try {
      const isSelected = items.find((item) => item.id === itemId).isSelected;
      await toggleCartItemSelection(itemId, isSelected);
      await updateTotal();
    } catch (error) {
      console.error("❌ 상품 선택 상태 업데이트 실패", error);
      setCartItems((prev) => prev); // 롤백
    }
  };

  // ✅ 수량 변경
  const handleUpdateItemQuantity = async (itemId, quantity) => {
    try {
      await updateCartItemQuantity(itemId, quantity);
      await calculateTotalWithDelivery();
      await updateTotal();
    } catch (error) {
      console.error("❌ 수량 업데이트 실패", error);
      setCartItems((prev) => prev); // 롤백
    }
  };

  // ✅ 상품 삭제
  const handleDeleteItem = async (itemId) => {
    try {
      await deleteCartItems(itemId);
      await updateTotal();
    } catch (error) {
      console.error("❌ 상품 삭제 실패", error);
      setCartItems((prev) => prev); // 롤백
    }
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-2xl shadow-md">
      {/* 브랜드 이름 및 전체 선택 */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <input
            type="checkbox"
            checked={isBrandAllSelected}
            onChange={handleToggleBrandSelect}
            className="w-5 h-5 rounded border-gray-400 accent-blue-600"
          />
          <span>
            {items[0].brandName}
          </span>
        </label>
      </div>

      {/* 브랜드 내 개별 상품 목록 */}
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <div className="flex gap-4 items-center">
            {/* 선택 */}
            <input
              type="checkbox"
              checked={item.isSelected}
              onChange={() => handleToggleItemSelect(item.id)}
              className="w-4 h-4 accent-blue-500"
            />

            {/* 상품 이미지 */}
            <img
              src={item.imageUrl || "/images/default-product.png"}
              alt={item.name}
              className="w-20 h-20 rounded-lg border object-cover"
            />

            {/* 상품 정보 */}
            <div>
              <p className="font-medium text-gray-900 text-base">{item.productTitle}</p>
              <p className="text-gray-500 text-sm">
                  {(item.productPrice ?? 0).toLocaleString()}원
              </p>
              <div className="flex gap-3 mt-2 items-center">
                {/* 수량 - */}
                <button
                  onClick={() => handleUpdateItemQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  -
                </button>
                <span className="text-gray-700 font-semibold">{item.quantity}</span>
                {/* 수량 + */}
                <button
                  onClick={() => handleUpdateItemQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 삭제 버튼 */}
          <button
            onClick={() => handleDeleteItem(item.id)}
            className="text-red-500 text-sm font-medium hover:underline"
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
};

export default BrandGroup;
