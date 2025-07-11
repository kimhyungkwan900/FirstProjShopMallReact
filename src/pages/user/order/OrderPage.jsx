import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../../../api/user/order/OrderApi";
// import {}
import { useContext } from "react";
import { UserContext } from "../../../component/common/Context/UserContext";
import { fetchAddresses } from "../../../api/user/order/AdressApi";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 장바구니에서 선택한 상품과 총액 데이터
  const { selectedItems, total } = location.state || { selectedItems: [], total: {} };

  const {user} = useContext(UserContext);
  const [deliveryAddressId, setDeliveryAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(""); // 기본 결제 방식
  const [deliveryRequest, setDeliveryRequest] = useState(""); // 요청사항
  const [selectedMethod, setSelectedMethod] = useState(""); //사용자가 고른 결제 방식
  const [selectedOther, setSelectedOther] = useState("");
  const [address, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState()

  // 결제 정보는 db에 저장이 되어야함

  //간편결제
  const quickPayments = [
    { id: "toss", label: "토스페이", color: "text-blue-500", benefits: [
      "계좌로 모든 상품 9만원 이상 결제 시 4천원 할인",
      "삼성카드로 모든 상품 12만원 이상 결제 시 5천원 할인"
    ] },
    { id: "kakao", label: "카카오페이", color: "text-yellow-500", benefits: [
      "페이머니로 모든 상품 7만원 이상 결제 시 3천원 할인"
    ] },
    { id: "payco", label: "페이코", color: "text-red-500", benefits: [
      "페이코 포인트로 모든 상품 6만원 이상 결제 시 2천원 할인"
    ] },
  ];

  //기타결제
  const otherPayments = [
    { id: "card", name: "신용카드" },
    { id: "bank", name: "무통장입금" },
    { id: "phone", name: "휴대폰" },
    { id: "samsung", name: "삼성페이" },
  ];

  const handleAddressList = async()=>{
    try{
      if(!await fetchAddresses(user.id)){
        return "등록된 배송지가 없습니다.";
      }
    }catch(error){
      console.error("배송지 목록을 불러오는 데 실패했습니다.", error);
    }
  }

  // 주문 생성 및 결제 처리
  const handleCreateOrder = async () => {
    if (!deliveryAddressId) {
      alert("배송지를 선택해주세요.");
      return;
    }

    try {
      const orderDto = {
        delivery_address_id: deliveryAddressId,
        order_date: new Date(),
        payment_method: paymentMethod,
        delivery_request: deliveryRequest,
      };

      const orderSummary = await createOrder(memberId, orderDto);

      alert(`주문이 완료되었습니다. 주문번호: ${orderSummary.orderId}`);

      // 주문 완료 페이지로 이동
      navigate("/order-complete", { state: { orderSummary } });
    } catch (error) {
      console.error("주문 생성 실패", error);
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6"> 주문서</h1>

      {/* ✅ 주문자 정보 */}
      <div className="flex flex-col gap-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-800 mb-2">{user.nickname}</p>
            <p className="text-[20px] text-black-500 mb-2">{user.phoneNumber}</p>
            <p className="text-[20px] text-black-600">배송지: <span className="font-medium">{user.address ?? "배송지를 선택하세요"}</span></p>
          </div>
          <button
            onClick={() => handleAddressList(user.id)}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-xl shadow transition-all"
          >
            배송지 추가
          </button>
        </div>

        {/* 배송 요청 사항 */}
        <h2 className="text-lg font-semibold">배송 요청사항</h2>
        <select className="text-[20px] border rounded-[5px] w-full p-3 pr-1">
          {/* 이건 배송 요청 사항 db에 다가 저장해야할거같음 */}
          <option value="">문 앞에 놔주세요</option>
          <option value="1">경비실에 맡겨주세요</option>
          <option value="2">택배함에 넣어주세요</option>
          <option value="3">배송 전에 연락 주세요</option>
          <option value="4">직접 입력</option>
        </select>
      </div>

      {/* ✅ 주문 상품 목록 */}
      <div className="mt-8 mb-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          주문 상품
        </h2>
        {selectedItems.length === 0 ? (
          <p className="text-gray-500 text-center italic">선택된 상품이 없습니다.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedItems.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition-all"
              >
                {/* 상품 이미지 */}
                <img
                  src={item.imageUrl || "/images/default-product.png"}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg border object-cover"
                />
                {/* 상품 정보 */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-sm text-gray-500">{item.brandName}</p>
                    <p className="font-semibold text-gray-800">{item.productTitle}</p>
                    <p className="text-gray-500">수량: {item.quantity}개</p>
                  </div>
                  <p className="text-lg font-bold text-black-600">
                    {((item.productPrice) ?? 0) * (item.quantity ?? 0).toLocaleString()}원
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          결제 수단
        </h2>

      {/* 간편결제 버튼 */}
      <div className="space-y-3">
        {quickPayments.map((method) => (
          <div key={method.id} className="border rounded-lg p-3">
            {/* 라디오 버튼 */}
            <label
              className={`flex items-center gap-2 cursor-pointer ${
                selectedMethod === method.id ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="quickPayment"
                checked={selectedMethod === method.id}
                onChange={() => setSelectedMethod(method.id)}
                className="accent-blue-500"
              />
              <span className={`font-semibold ${method.color}`}>{method.label}</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                혜택
              </span>
            </label>

            {/* ✅ 혜택 목록 */}
            {selectedMethod === method.id && (
              <ul className="mt-2 space-y-1 pl-5">
                {method.benefits.map((benefit, idx) => (
                  <li key={idx} className="text-sm text-gray-600 before:content-['•'] before:mr-2">
                    {benefit}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>


      {/* ✅ 기타 결제 */}
      <div className="space-y-1">
        <label className={`flex items-center gap-2 p-3 mb-3 text-p[15px] font-medium border rounded-lg cursor-pointer ${
              selectedMethod === "other" ? "border-blue-500" : "border-black-300"
            }`}>
          <input
            type="radio"
            name="quickPayment"
            checked={selectedMethod === "other"}
            onChange={() => {
              setSelectedMethod("other");
              setSelectedOther(""); // 선택 해제
            }}
          />
          기타 결제
        </label>

        {/* 기타 결제 버튼 */}
        {selectedMethod === "other" && (
          <div className="grid grid-cols-2 gap-2">
            {otherPayments.map((method) => (
              <button
                key={method.id}
                className={`p-2 border rounded-lg text-center font-medium ${
                  selectedOther === method.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedOther(method.id)}
              >
                {method.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>

      {/* 💰 총 결제 금액 */}
      <div className="p-6 mt-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">결제 금액</h3>

        {/* 상품 금액 */}
        <div className="flex justify-between mb-2 text-gray-700">
          <span className="font-medium">상품 금액</span>
          <span className="font-semibold text-gray-800">
            {(total.totalProductPrice ?? 0).toLocaleString()}원
          </span>
        </div>

        {/* 배송비 */}
        <div className="flex justify-between mb-2 text-gray-700">
          <span className="font-medium">배송비</span>
          <span
            className={`font-semibold ${
              total.deliveryFee === 0 ? "text-black-600" : "text-gray-800"
            }`}
          >
            {total.deliveryFee === 0
              ? "무료 배송"
              : `${total.deliveryFee.toLocaleString()}원`}
          </span>
        </div>

        {/* 총 결제 금액 */}
        <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
          <span className="text-lg font-bold">총 결제금액</span>
          <span className="text-2xl font-extrabold text-green-600">
            {(total.grandTotal ?? 0).toLocaleString()}원
          </span>
        </div>

        {/* 결제 버튼 */}
        <button
          onClick={handleCreateOrder}
          className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl shadow-md transition-all">
          {(total.grandTotal ?? 0).toLocaleString()}원 결제하기
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
