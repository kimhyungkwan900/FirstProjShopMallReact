import React from "react";

const BrandGroup = ({
  brand,
  items,
  handleToggleSelectBrand,
  handleToggleSelectItem,
  handleUpdateQuantity,
  handleDeleteCartItem,
  handleMoveToItemToWishlist,
}) => {
  const brandSelected = items.every((item) => item.selected);

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      {/* 브랜드 헤더 */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={brandSelected}
            onChange={(e) =>
              handleToggleSelectBrand(brand, e.target.checked)
            }
            className="w-4 h-4"
          />
          <span className="font-semibold text-lg">{brand}</span>
        </div>
      </div>

      {/* 상품 목록 */}
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center py-2 border-b"
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={item.selected}
                onChange={(e) =>
                  handleToggleSelectItem(item.id, e.target.checked)
                }
                className="w-4 h-4"
              />
              <span>{item.productName}</span>
            </div>

            <div className="flex items-center space-x-2">
              {/* 수량 조절 */}
              <button
                onClick={() =>
                  handleUpdateQuantity(item.id, item.quantity - 1)
                }
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  handleUpdateQuantity(item.id, item.quantity + 1)
                }
                className="px-2 py-1 border rounded"
              >
                +
              </button>

              {/* 삭제 */}
              <button
                onClick={() => handleDeleteCartItem(item.id)}
                className="text-red-500"
              >
                삭제
              </button>

              {/* 위시리스트 이동 */}
              <button
                onClick={() => handleMoveToItemToWishlist(item.id)}
                className="text-yellow-500"
              >
                위시리스트
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandGroup;
