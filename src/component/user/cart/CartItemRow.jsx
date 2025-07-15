import React from "react";
import { useNavigate } from "react-router-dom";
import WishlistButton from "../product/WishlistButton";

/**
 * 장바구니 페이지에서 개별 상품 행을 렌더링하는 컴포넌트
 */
const CartItemRow = ({
  item,
  onToggleItemSelect,
  onUpdateQuantity,
  onDeleteItem
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
    >
      {/* 좌측: 선택 체크박스, 상품 이미지, 상품 정보 */}
      <div className="flex gap-4 items-center">
        {/* 개별 상품 선택 체크박스 */}
        <input
          type="checkbox"
          checked={item._selected}
          onChange={() => onToggleItemSelect(item.id)}
          className="w-4 h-4 accent-blue-500"
        />

        {/* 상품 이미지 (없을 경우 기본 이미지 표시) */}
        <img
          src={item.imageUrl || "/images/default-product.png"}
          alt={item.name}
          className="w-25 h-25 rounded-lg border object-cover"
        />

        {/* 상품 제목 및 수량 조절 UI */}
        <div>
          {/* 상품 상세 페이지로 이동 버튼 */}
          <button
            onClick={() => navigate(`/products/${item.product_id}`)}
            className="hover:underline"
          >
            {item.productTitle}
          </button>

          {/* 현재 선택된 수량 */}
          <p className="text-gray-500 text-sm flex space-x-4">
            <span>{(item.quantity ?? 0).toLocaleString()}개</span>
          </p>

          {/* 수량 조절 버튼 (-, +) */}
          <div className="flex gap-3 mt-2 items-center">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1} // 수량이 1 이하일 때 - 버튼 비활성화
              className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              -
            </button>
            <span className="text-gray-700 font-semibold">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 border rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 우측: 가격 표시, 찜 버튼, 삭제 버튼 */}
      <div className="flex gap-2 items-center">
        {/* 상품 가격 */}
        <div>
          <span className="text-xl font-bold">
            {(item.productPrice ?? 0).toLocaleString()}원
          </span>
        </div>

        {/* 찜 버튼 (Wishlist 추가/제거) */}
        <WishlistButton productId={item.product_id} />

        {/* 상품 삭제 버튼 */}
        <button
          onClick={() => onDeleteItem(item.id)}
          className="hover:scale-110 transition-transform duration-150 text-xl"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItemRow;