import { useState, useEffect } from "react";
import ReviewWriterFormModal from "../review/ReviewWriterFormModal";
import MyOrderReturnForm from "./MyOrderReturnForm";
import MyOrderDeleteButton from "./MyOrderDeleteButton";
import DeliverySelectButton from "./DeliverySelectButton";
import CartButton from "../cart/CartButton";

const MyOrderContent = ({ orders: ordersProp, memberId, onDelete }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [reviewInfo, setReviewInfo] = useState(null);
  const [returnInfo, setReturnInfo] = useState(null);

  const [orders, setOrders] = useState([]);


  const returnTypeLabels = {
  CANCEL_REQUEST: "취소 신청",
  CANCEL_COMPLETE: "취소 완료",
  CANCEL_REJECTED: "취소 반려",
  RETURN_REQUEST: "반품 신청",
  RETURN_COMPLETE: "반품 완료",
  RETURN_REJECTED: "반품 반려",
  EXCHANGE_REQUEST: "교환 신청",
  EXCHANGE_COMPLETE: "교환 완료",
  EXCHANGE_REJECTED: "교환 반려",
};

const orderStatusLabels = {
  확인: "배송 준비",
  접수: "배송 준비",
  배송중: "배송중",
  배송완료: "배송완료",
};

const courierCode = {
  "04" : "CJ대한통운",
  "08" : "롯대택배",
  "06" : "로젠택배"
}

  useEffect(() => {
    setOrders(ordersProp);
  }, [ordersProp]);

  const handleReviewWritten = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, existsReview: true } : order
      )
    );
    setIsReviewModalOpen(false);
    setReviewInfo(null);
  };

 const handleReturnRequest = (order, type) => {
  setReturnInfo({
    orderId: order.id,
    type,
  });
  setIsReturnModalOpen(true);
};



  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500 h-60 mt-4 text-center">
        주문 내역이 없습니다.
      </div>
    );
  }
  return (
    <div className="px-4 mt-6 space-y-4 w-250 m-auto mb-20">
      {orders.map((order) => (
        <div
          key={order.id}
          className={`items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-gray-50 ${
            order.orderDelete === true ? 'hidden' : ''
          }`}
>
          <div className="flex justify-between">
            <div className="font-semibold pb-2">결제 방식 : {order.paymentMethod}</div>
            <div>
            <MyOrderDeleteButton
              orderId={order.id}
              onDelete={(orderId) => {
                setOrders((prev) => prev.filter((o) => o.id !== orderId));
                onDelete(orderId);
              }}
              />
              </div>
          </div>

          <div className="flex items-center space-x-2  justify-between">
            <div className="font-semibold pb-2">주문날짜 : {order.orderDate}</div>
             {order.trackingInfo?.trackingNumber && order.orderStatus === '배송중' && !order.returnType ? (
                <div className="flex justify-end text-blue-700 font-bold">
                 <span className="font-bold mr-1 text-black">택배사 :</span>
                 {courierCode[order.trackingInfo?.courierCode]} <span className="text-black ml-1">/</span>
                 <span className="font-bold ml-1 mr-1 text-black">운송장 번호 : </span> 
                 {order.trackingInfo.trackingNumber}
                </div>
              ) : null}
          </div>

          <div className="flex justify-between">
            <div className="font-semibold pb-2 mb-2">
              상품명 :<a
                    href={`/products/${order.product?.id }`}
                    target="_blank"
                    rel="noopener noreferrer">
                  {order.product?.name}
                </a>
              
            </div>
            <div className="font-semibold pb-2"> 
              <span className="ml-2">상태 :</span>
              <span className="text-blue-600">
              {order.returnType
                ? returnTypeLabels[order.returnType]
                : orderStatusLabels[order.orderStatus] || order.orderStatus}
              </span>
              {order.orderStatus === "배송중" && !order.returnType && order.trackingInfo?.trackingNumber ? (
              <DeliverySelectButton
                trackingNumber={order.trackingInfo?.trackingNumber}
                courierCode={order.trackingInfo?.courierCode}
              />
            ) : null}
            </div>

          </div>
         
          <div className="flex justify-between">
            <div className="flex">
              {order.product?.image ? (
                <img
                  src={order.product.image.imgUrl}
                  alt={order.product.name || "상품 이미지"}
                  className="w-24 h-24 object-cover rounded"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center text-gray-400 border rounded">
                  이미지 없음
                </div>
              )}
            <div className="ml-3 font-bold"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4 ,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "450px",
                    whiteSpace: "normal",
                  }}
                >
                {order.product?.description}
              </div>
              
            </div>

            <div className="ml-auto text-right mt-5">
              <div className="font-semibold">주문 수량 : {order.totalCount}</div>
              <div className="font-semibold">상품 가격 :  ₩{(order.product?.price ?? 0).toLocaleString()}원</div>
              <div className="font-semibold">총 주문 금액 :  ₩{(order.totalAmount ?? 0).toLocaleString()}원</div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            {!order.returnType && order.orderStatus === "배송완료" && !order.existsReview && (
              <button
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={() => {
                  setReviewInfo({
                    memberId,
                    orderId: order.id,
                    productId: order.product?.id,
                  });
                  setIsReviewModalOpen(true);
                }}
              >
                리뷰쓰기
              </button>
            )}

            {!order.returnType &&
              (order.orderStatus === "배송중" || order.orderStatus === "배송완료") && (
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => handleReturnRequest(order, "", order.id)}>
                  교환/반품
                </button>
              )}

            {!order.returnType &&
              (order.orderStatus === "접수" || order.orderStatus === "확인") && (
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => handleReturnRequest(order, "CANCEL", order.id)}>
                  취소
                </button>
              )}
               <CartButton productId={order.product?.id} status={order.product?.sellStatus}/>
          </div>
        </div>
      ))}

      {/* 리뷰 작성 모달 */}
      {isReviewModalOpen && reviewInfo && (
        <ReviewWriterFormModal
          onClose={() => {
            setIsReviewModalOpen(false);
            setReviewInfo(null);
          }}
          reviewInfo={reviewInfo}
          onReviewWritten={handleReviewWritten}/>)}

      {/* 반품/교환/취소 신청 모달 */}
        {isReturnModalOpen && returnInfo && (
        <MyOrderReturnForm
          onClose={() => {
            setIsReturnModalOpen(false);
            setReturnInfo(null); }}
          defaultType={returnInfo.type}
          orderId={returnInfo.orderId}
          memberId={memberId}
          onSuccess={(returnType) => {
            // returnType으로 해당 order의 상태를 갱신
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.id === returnInfo.orderId ? { ...order, returnType } : order
              )
            );
          }}
        />
      )}
    </div>
  );
};

export default MyOrderContent;