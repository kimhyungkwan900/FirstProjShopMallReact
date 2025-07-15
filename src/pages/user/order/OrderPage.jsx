import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../../../api/user/order/OrderApi";
import { UserContext } from "../../../component/common/Context/UserContext";

import AddressModal from "../../../component/user/order/AddressModal";
import PaymentOptions from "../../../component/user/order/PaymentOptions";
import OrdererInfo from "../../../component/user/order/OrdererInfo";
import PaymentSummary from "../../../component/user/order/PaymentSummary";
import OrderItems from "../../../component/user/order/OrderItems";

/**
 * 주문 페이지 컴포넌트
 * - 주문자 정보, 배송지, 결제수단, 요청사항 입력 및 주문 생성 처리
 */
const OrderPage = () => {
  const location = useLocation();           // 장바구니에서 전달받은 데이터
  const navigate = useNavigate();           // 페이지 이동용
  const { total, selectedItems } = location.state || { selectedItems: [], total: {} }; // 총 결제 금액
  const { user } = useContext(UserContext); // 현재 로그인한 사용자 정보

  // ✅ 상태 관리
  const [deliveryAddressId, setDeliveryAddressId] = useState(null); // 선택된 배송지 ID
  const [paymentMethod, setPaymentMethod] = useState("");           // 선택된 결제수단
  const [deliveryRequest, setDeliveryRequest] = useState("");       // 배송 요청사항
  const [showAddressModal, setShowAddressModal] = useState(false);  // 배송지 모달 표시 여부
  const [selectedAddress, setSelectedAddress] = useState(null);     // 선택된 배송지 객체

  // ✅ 주문 생성 및 결제 처리
  const handleCreateOrder = async () => {
    if (!deliveryAddressId) {
      alert("배송지를 선택해주세요.");
      return;
    }
    if (!paymentMethod) {
      alert("결제 수단을 선택해주세요.");
      return;
    }
    try {
      // 주문 DTO 구성
      const orderDto = {
        delivery_address_id: deliveryAddressId,
        order_date: new Date(),
        payment_method: paymentMethod,
        delivery_request: deliveryRequest, // 배송 요청사항 포함
      };

      await createOrder(user.id, orderDto); // 주문 생성 API 호출
      alert("주문이 완료되었습니다.");
      navigate("/order-complete");          // 주문 완료 페이지로 이동
    } catch (error) {
      console.error("주문 생성 실패", error);
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-md space-y-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">주문서</h1>

      <div className="flex gap-8">
        {/* 왼쪽: 주문자 정보 및 주문 상품 */}
        <div className="flex-1 space-y-6">
          <OrdererInfo
            user={user}
            selectedAddress={selectedAddress}
            onOpenModal={() => setShowAddressModal(true)}
            deliveryRequest={deliveryRequest}
            onRequestChange={setDeliveryRequest}
          />

          <OrderItems selectedItems={selectedItems} />

          <PaymentOptions
            onSelectPayment={setPaymentMethod}
          />
        </div>

        {/* 오른쪽: 결제 요약 */}
        <div className="basis-[35%] min-w-[300px]">
          <PaymentSummary
            total={total}
            onSubmit={handleCreateOrder}
          />
        </div>
      </div>

      {showAddressModal && (
        <AddressModal
          onClose={() => setShowAddressModal(false)}
          onConfirm={(address) => {
            setSelectedAddress(address);
            setDeliveryAddressId(address.id);
            setShowAddressModal(false);
          }}
        />
      )}
    </div>
  );
};

export default OrderPage;
