import React from "react";

/**
 * 주문 상품 목록 컴포넌트
 */
const OrderItems = ({ selectedItems }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow border border-gray-200 space-y-4">
      <h2 className="text-[22px] font-semibold text-gray-900 border-b pb-2">주문 상품</h2>
      {selectedItems.length === 0 ? (
        <p className="text-gray-500 text-center italic">선택된 상품이 없습니다.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {selectedItems.map((item) => (
            <li
              key={item.id}
              className="flex gap-5 py-4"
            >
              <img
                src={item.imageUrl || "/images/default-product.png"}
                alt={item.productTitle}
                className="w-27 h-27 rounded-lg border object-cover"
              />
              <div className="flex flex-col justify-between flex-1">
                <div className="space-y-1">
                  <p className="text-[16px] text-gray-500">{item.brandName}</p>
                  <p className="text-[20px] font-semibold text-gray-800">{item.productTitle}</p>
                  <p className="text-[15px] text-gray-500">수량: {item.quantity}개</p>
                </div>
                <p className="text-[18px] text-lg font-bold text-gray-900">
                  {(item.productPrice ?? 0).toLocaleString()}원
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderItems;
