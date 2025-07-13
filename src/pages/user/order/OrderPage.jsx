import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../../../api/user/order/OrderApi";
import { UserContext } from "../../../component/common/Context/UserContext";

import AddressModal from "../../../component/order/AddressModal";
import PaymentOptions from "../../../component/order/PaymentOptions";
import OrdererInfo from "../../../component/order/OrdererInfo";
import PaymentSummary from "../../../component/order/PaymentSummary";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total } = location.state || { selectedItems: [], total: {} };
  const { user } = useContext(UserContext);

  const [deliveryAddressId, setDeliveryAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryRequest, setDeliveryRequest] = useState(""); // 🚨 요청사항 상태
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

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
      const orderDto = {
        delivery_address_id: deliveryAddressId,
        order_date: new Date(),
        payment_method: paymentMethod,
        delivery_request: deliveryRequest, // 🚨 요청사항 전달
      };
      await createOrder(user.id, orderDto);
      alert("주문이 완료되었습니다.");
      navigate("/order-complete");
    } catch (error) {
      console.error("주문 생성 실패", error);
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-md space-y-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">주문서</h1>

      <OrdererInfo
        user={user}
        selectedAddress={selectedAddress}
        onOpenModal={() => setShowAddressModal(true)}
        deliveryRequest={deliveryRequest}
        onRequestChange={setDeliveryRequest} // 🚨 요청사항 상태 관리
      />

      <PaymentOptions
        onSelectPayment={setPaymentMethod}
      />

      <PaymentSummary
        total={total}
        onSubmit={handleCreateOrder}
      />

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
