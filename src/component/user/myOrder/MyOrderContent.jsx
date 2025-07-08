const MyOrderContent = ({ orders }) => {
  // 주문 내역이 없을 경우
  if (!orders || orders.length === 0) {
    return <p className="text-center text-gray-500 mt-4">주문 내역이 없습니다.</p>;
  }

  return (
    <div className="px-4 mt-6 space-y-4 w-250 m-auto mb-20">
      {orders.map((order) => (
        <div
          key={order.id}
          className="items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-gray-50"
        >
          {/* 상단: 결제 방식 및 닫기 버튼 */}
          <div className="flex justify-between">
            <div className="font-semibold pb-2">결제 방식 : {order.paymentMethod}</div>
            <button className="px-3 bg-gray-400 text-white rounded hover:bg-black transition">
              x
            </button>
          </div>

          {/* 주문일자 */}
          <div className="flex items-center space-x-2 mb-2 justify-between">
            <div className="font-semibold pb-2">주문날자 : {order.orderDate}</div>
          </div>

          {/* 상품명 + 상태 표시 */}
          <div className="flex justify-between mt-4">
            <div className="font-semibold pb-2 mb-2">
              상품명 : {order.product?.name || '상품명 없음'}
            </div>

            <div className="font-semibold pb-2">
              <sapn className="text-black">상태</sapn> : <sapn className="text-blue-600">{
                order.returnType
                  ? {
                      CANCEL_REQUEST: "취소 신청",
                      CANCEL_COMPLETE: "취소 완료",
                      RETURN_REQUEST: "반품 신청",
                      RETURN_COMPLETE: "반품 완료",
                      EXCHANGE_REQUEST: "교환 신청",
                      EXCHANGE_COMPLETE: "교환 완료"
                    }[order.returnType]
                  : {
                      "확인" : "배송 준비",
                      "접수" : "배송 준비"
                    }[order.orderStatus] || order.orderStatus 
              }</sapn>
            </div>
          </div>

          {/* 상품 이미지 + 수량, 금액 */}
          <div className="flex justify-between">
            <div>
              {order.product?.image ? (
                <img
                  src={order.product.image}
                  alt={order.product.name || '상품 이미지'}
                  className="w-24 h-24 object-cover rounded"
                />
              ) : (
                '이미지 없음'
              )}
            </div>

            <div className="ml-auto text-right mt-5">
              <div className="font-semibold pb-2">주문 수량 : {order.totalCount}</div>
              <div className="font-semibold pb-2">총 주문 금액 : {order.totalAmount}</div>
            </div>
          </div>

          {/* 리뷰/취소/교환반품 버튼 */}
          <div className="flex justify-end gap-2">
            {/* 리뷰 쓰기 버튼: 교환/반품 안했고 배송완료일 때 */}
            {!order.returnType && order.orderStatus === "배송완료" && !order.existsReview && (
              <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                리뷰쓰기
              </button>
            )}

            {/* 교환/반품 버튼: 배송중 또는 배송완료일 때 */}
            {!order.returnType &&
              (order.orderStatus === "배송중" || order.orderStatus === "배송완료") && (
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                  교환/반품
                </button>
              )}

            {/* 주문 취소 버튼: 접수 또는 확인 상태일 때 */}
            {!order.returnType &&
              (order.orderStatus === "접수" || order.orderStatus === "확인") && (
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                  취소
                </button>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrderContent;