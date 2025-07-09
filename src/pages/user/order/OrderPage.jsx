import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 기본 배송지 데이터
  const [orderData, setOrderData] = useState({
    name: "홍길동",
    phone: "010-1234-5678",
    address: "서울특별시 강남구 테헤란로 123",
  });

  // 배송지 목록
  const [addressList, setAddressList] = useState([
    { id: 1, name: "홍길동", phone: "010-1234-5678", address: "서울특별시 강남구 테헤란로 123" },
    { id: 2, name: "이영희", phone: "010-9876-5432", address: "서울특별시 서초구 반포대로 456" },
    { id: 3, name: "김철수", phone: "010-5555-6666", address: "경기도 성남시 분당구 불정로 789" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", phone: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("신용카드");

  // ✅ 쿠폰 선택 상태 (기본: 없음)
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [couponOpen, setCouponOpen] = useState(false); // 드롭다운 열림 여부

  // 쿠폰 목록 (지금은 비어있음 → 데이터 연결 전 상태)
  const coupons = [];

  const { selectedItems, total } = location.state || { selectedItems: [], total: {} };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSelectAddress = (address) => {
    setOrderData(address);
    setShowModal(false);
  };

  const handleSaveNewAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    const updatedList = [...addressList, { id: addressList.length + 1, ...newAddress }];
    setAddressList(updatedList);
    setOrderData(newAddress);
    setNewAddress({ name: "", phone: "", address: "" });
    setShowModal(false);
  };

  const handlePayment = () => {
    alert("결제가 완료되었습니다.");
    navigate("/"); // 결제 완료 후 홈으로 이동 
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen px-4 py-10">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8">
        {/* 왼쪽: 주문 정보 */}
        <div className="flex-1 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4 flex items-center gap-2">
            📝 주문서
          </h1>

          {/* 배송지 정보 */}
          <div className="flex justify-between items-start mb-8 border-b pb-5">
            <div>
              <p className="text-xl font-semibold text-gray-800 mb-1">{orderData.name}</p>
              <p className="text-gray-600 mb-1">{orderData.address}</p>
              <p className="text-gray-500">{orderData.phone}</p>
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition-all"
            >
              배송지 변경
            </button>
          </div>

          {/* 주문 상품 */}
          <h2 className="text-xl font-semibold mb-4 text-gray-700">📦 주문 상품</h2>
          {selectedItems.length === 0 ? (
            <p className="text-gray-400 italic">주문할 상품이 없습니다.</p>
          ) : (
            <div className="space-y-4">
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 rounded-xl shadow-sm p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-lg border" />
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.quantity}개</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {(item.price * item.quantity).toLocaleString()} 원
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 결제 수단 */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">💳 결제 수단</h3>
            <div className="flex gap-3">
              {["신용카드", "현금 결제", "휴대폰 결제"].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`px-4 py-2 rounded-xl border shadow-sm ${
                    paymentMethod === method
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  } transition`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* 쿠폰 선택 */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">🏷️ 장바구니 쿠폰</h3>
            <div className="relative">
              <button
                onClick={() => setCouponOpen(!couponOpen)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center bg-white shadow-sm hover:border-blue-400 transition"
              >
                {selectedCoupon || "사용 가능한 쿠폰 없음"}
                <span className="text-gray-400">{couponOpen ? "▲" : "▼"}</span>
              </button>

              {couponOpen && (
                <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-md mt-1 w-full">
                  {coupons.length === 0 ? (
                    <p className="px-4 py-2 text-gray-500 text-sm">사용 가능한 쿠폰 없음</p>
                  ) : (
                    coupons.map((coupon) => (
                      <div
                        key={coupon.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedCoupon(coupon.name);
                          setCouponOpen(false);
                        }}
                      >
                        {coupon.name}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 오른쪽: 총 결제 금액 */}
        <div className="w-full lg:w-[360px]">
          <div className="sticky top-10">
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-gray-800">💰 총 결제 금액</h2>
              <div className="flex justify-between mb-2 text-gray-700">
                <span>상품 합계</span>
                <span>{total.totalProductPrice.toLocaleString()} 원</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-700">
                <span>배송비</span>
                <span>{total.deliveryFee.toLocaleString()} 원</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
                <span>총액</span>
                <span className="text-green-600">
                  {(total.grandTotal ?? 0).toLocaleString()} 원
                </span>
              </div>
              <button
                onClick={handlePayment}
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl shadow-lg transition"
              >
                {paymentMethod}로 결제하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 배송지 변경 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold mb-4">🚚 배송지 변경</h3>
            <div className="space-y-2 mb-4">
              {addressList.map((addr) => (
                <div
                  key={addr.id}
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSelectAddress(addr)}
                >
                  <div>
                    <p className="font-medium text-gray-800">{addr.name}</p>
                    <p className="text-sm text-gray-600">{addr.address}</p>
                    <p className="text-sm text-gray-500">{addr.phone}</p>
                  </div>
                  <button className="text-blue-500 text-sm">선택</button>
                </div>
              ))}
            </div>

            {/* 새 배송지 입력 */}
            <h4 className="text-md font-semibold mb-2">➕ 새 배송지 추가</h4>
            <input
              type="text"
              placeholder="수령인 이름"
              value={newAddress.name}
              onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            />
            <input
              type="text"
              placeholder="연락처"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
              className="w-full border rounded p-2 mb-2"
            />
            <input
              type="text"
              placeholder="주소"
              value={newAddress.address}
              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              className="w-full border rounded p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={handleSaveNewAddress}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
