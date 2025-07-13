import React, { useState } from "react";

const quickPayments = [
  { 
    id: "toss", 
    label: "토스페이", 
    benefits: [
      "계좌로 모든 상품 9만원 이상 결제 시 4천원 할인",
      "삼성카드로 모든 상품 12만원 이상 결제 시 5천원 할인"
    ] 
  },
  { 
    id: "kakao", 
    label: "카카오페이", 
    benefits: [
      "페이머니로 7만원 이상 결제 시 3천원 할인"
    ] 
  },
  { 
    id: "payco", 
    label: "페이코", 
    benefits: [
      "포인트로 6만원 이상 결제 시 2천원 할인"
    ] 
  },
];

const otherPayments = [
  { id: "card", name: "신용카드" },
  { id: "bank", name: "무통장입금" },
  { id: "phone", name: "휴대폰" },
  { id: "samsung", name: "삼성페이" },
];

const PaymentOptions = ({ onSelectPayment}) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedOther, setSelectedOther] = useState("");



  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow border border-gray-200 space-y-6">
      <h2 className="text-[22px] text-gray-900 font-semibold border-b pb-2">결제 수단</h2>

      {/* ✅ 간편결제 */}
      {quickPayments.map((method) => (
        <div
          key={method.id}
          className={`p-4 rounded-lg border cursor-pointer transition-all ${
            selectedMethod === method.id
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => {
            setSelectedMethod(method.id);
            setSelectedOther("");
            onSelectPayment(method.id);
          }}
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-800">{method.label}</span>
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
              혜택
            </span>
          </div>
          {/* ✅ 선택된 간편결제일 때 혜택 표시 */}
          {selectedMethod === method.id && (
            <ul className="mt-2 space-y-1 pl-4 text-gray-600">
              {method.benefits.map((benefit, idx) => (
                <li key={idx} className="text-sm before:content-['•'] before:mr-2">
                  {benefit}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* ✅ 기타결제 */}
      <div className="mt-4">
        <label className="block mb-2 font-medium text-gray-800">기타 결제</label>
        <div className="grid grid-cols-2 gap-3">
          {otherPayments.map((method) => (
            <button
              key={method.id}
              className={`p-3 rounded-md font-medium border transition-all ${
                selectedOther === method.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => {
                setSelectedOther(method.id);
                setSelectedMethod("other");
                onSelectPayment(method.id);
              }}
            >
              {method.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
