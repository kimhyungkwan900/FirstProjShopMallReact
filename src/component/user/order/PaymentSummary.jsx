import React from "react";

const PaymentSummary = ({ total, onSubmit }) => (
  <div className="sticky top-6">
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">결제 금액</h2>

      {/* 상품 합계 */}
      <div className="flex justify-between mb-3 text-lg">
        <span>상품 합계</span>
        <span>{(total.totalProductPrice ?? 0).toLocaleString()} 원</span>
      </div>

      {/* 배송비 */}
      <div className="flex justify-between mb-3 text-lg">
        <span>배송비</span>
        {total?.deliveryFee
          ? `${total.deliveryFee.toLocaleString()} 원`
          : "0 원"}
      </div>

      {/* 안내 문구 */}
      <div className="flex justify-between mb-3 text-[15px] text-gray-400">
        <span>5만원 이상 구매시 무료 배송</span>
      </div>

      {/* 총액 */}
      <div className="flex justify-between mb-5 text-xl font-bold border-t pt-4">
        <span>총액</span>
        <span className="text-green-600">
          {(total.grandTotal ?? 0).toLocaleString()} 원
        </span>
      </div>

      {/* 결제 버튼 */}
      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-2xl shadow-lg transition-colors"
      >
        {(total.grandTotal ?? 0).toLocaleString()} 결제하기
      </button>
    </div>
  </div>
);

export default PaymentSummary;