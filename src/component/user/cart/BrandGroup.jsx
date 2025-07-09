import React from "react";

const BrandGroup = ({
  brand, // 브랜드 이름
  items, // 해당 브랜드의 장바구니 아이템들
  onDeleteItem, // 상품 삭제 핸들러
  onUpdateQuantity, // 수량 업데이트 핸들러
  onToggleSelect, // 개별 상품 선택/해제 핸들러
  onToggleSelectBrand, // 브랜드 전체 선택/해제 핸들러

}) => {
  // 현재 브랜드의 모든 상품이 선택되었는지 여부 확인
  const isBrandAllSelected = items.every((item) => item.isSelected);

  // 브랜드 전체 선택/해제 처리 함수
  const handleToggleBrandSelect = () => {
    // API 호출 없이 상태만 업데이트
    onToggleSelectBrand(brand, !isBrandAllSelected);
  };

  // 개별 상품 선택/해제 처리 함수
  const handleToggleItemSelect = (item) => {
    // API 호출 없이 상태만 업데이트
    onToggleSelect(item.id);
  };

  // 상품 수량 변경 처리 함수
  const handleUpdateItemQuantity = (item, quantity) => {
    if (quantity < 1) return; // 수량 1 미만으로 못 내려가게 처리
    // API 호출 없이 상태만 업데이트
    onUpdateQuantity(item.id, quantity);
  };

  // 상품 삭제 처리 함수
  const handleDeleteItem = (item) => {
    // API 호출 없이 상태만 업데이트
    onDeleteItem(item.id);
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-2xl shadow-md">
      {/* 브랜드 이름과 브랜드 전체 선택 체크박스 */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <input
            type="checkbox"
            checked={isBrandAllSelected}
            onChange={handleToggleBrandSelect}
            className="w-5 h-5 rounded border-gray-400 accent-blue-600"
          />
          <span>{brand}</span>
        </label>
      </div>

      {/* 브랜드 내 개별 상품 목록 */}
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <div className="flex gap-4 items-center">
            {/* 개별 상품 선택 체크박스 */}
            <input
              type="checkbox"
              checked={item.isSelected}
              onChange={() => handleToggleItemSelect(item)}
              className="w-4 h-4 accent-blue-500"
            />

            {/* 상품 이미지 */}
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-20 h-20 rounded-lg border"
            />

            {/* 상품 정보 및 수량 조절 */}
            <div>
              <p className="font-medium text-gray-900 text-base">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.price.toLocaleString()}원</p>
              <div className="flex gap-3 mt-2 items-center">
                {/* 수량 감소 버튼 */}
                <button
                  onClick={() => handleUpdateItemQuantity(item, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  -
                </button>
                <span className="text-gray-700 font-semibold">{item.quantity}</span>
                {/* 수량 증가 버튼 */}
                <button
                  onClick={() => handleUpdateItemQuantity(item, item.quantity + 1)}
                  className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 상품 삭제 버튼 */}
          <button
            onClick={() => handleDeleteItem(item)}
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
