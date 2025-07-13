import React from "react";
import { formatPrice } from "../../utils/user/product/formatters";

const PaymentSummary = ({ total, onSubmit }) => (
  <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
    <h3 className="text-2xl font-bold mb-4 text-gray-900">결제 금액</h3>
    <div className="flex justify-between mb-3 text-gray-800">
      <span>상품 금액</span>
      <span>{formatPrice(total.totalProductPrice)}</span>
    </div>
    <div className="flex justify-between mb-3 text-gray-800">
      <span>배송비</span>
      <span>
        {total.deliveryFee === 0 ? "무료 배송" : `${formatPrice(total.deliveryFee)}`}
      </span>
    </div>
    <div className="flex justify-between text-lg font-semibold border-t pt-3 mt-3">
      <span>총 결제금액</span>
      <span className="text-2xl font-extrabold text-blue-600">
        {formatPrice(total.grandTotal)}
      </span>
    </div>
    <button
      onClick={onSubmit}
      className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-lg rounded-full shadow-lg hover:scale-105 transition-all"
    >
      {formatPrice(total.grandTotal)} 결제하기
    </button>
  </div>
);

export default PaymentSummary;
