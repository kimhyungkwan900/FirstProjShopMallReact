import { useState } from "react";
import MyOrderDeleteButton from "../myOrder/MyOrderDeleteButton";

const OrderChangeContent = ({ list, onDelete }) => {

  const [openItems, setOpenItems] = useState({});

  const toggleDetails = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  return (
    <div className="w-250 m-auto">
      <div className="space-y-4">
        {list && list.length > 0 ? (
          list
          .filter((item) => !item.orderDelete)
          .map((item) => (
            <div
              key={item.id}
              className="p-4 transition font-bold border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-gray-50 mb-3">
              <div className="text-xs text-gray-500">신청일: {item.regDate || "정보 없음"}</div>
              <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="font-bold text-blue-600 flex gap-2"><p className="text-black">상태:</p> {returnTypeLabels[item.returnType]}</div>
              </div>
                <MyOrderDeleteButton orderId={item.orderId} onDelete={onDelete} />
              </div>
                <div className="font-bold text-gray-800">
                  주문 날짜 : {item.orderDate}
                </div>

                <div className="font-bold text-gray-800 mt-2">
                  상품명 : <a
                    href={`/products/${item.product?.id }`}
                    target="_blank"
                    rel="noopener noreferrer">
                    {item.product?.name}
                   </a>
                </div>
                <div className="flex justify-between">
                {item.product?.image?.imgUrl ? (
                  <img
                    src={item.product.image.imgUrl || null}
                    alt={item.product?.name || "상품 이미지"}
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center text-gray-400 border rounded">
                        이미지 없음
                  </div>
                )}
                   <div className="ml-auto text-right mt-5">
                    <div className="font-semibold">주문 수량 : {item.totalCount}</div>
                    <div className="font-semibold">상품 가격 :  ₩{(item.product?.price ?? 0).toLocaleString()}원</div>
                    <div className="font-semibold">총 주문 금액 : ₩{(item.totalAmount ?? 0).toLocaleString()}원</div>
                  </div>
                </div>

              <button
                className="text-sm text-gray-500 mt-2 hover:text-black"
                onClick={() => toggleDetails(item.id)}>
                {openItems[item.id] ? "내용 숨기기 ▲" : "사유 및 상세보기 ▼"}
              </button>

              <div
                className={`transition-all overflow-hidden duration-500 ${
                  openItems[item.id] ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-sm font-normal text-gray-700 space-y-1 bg-gray-50 p-3 rounded">
                  <div>사유: {item.reason}</div>
                  <div>상세 내용: {item.detail}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
         <div className="flex items-center justify-center text-gray-500 h-90 mt-4 text-center">
        주문 내역이 없습니다.
        </div>
        )}
      </div> 
    </div>
  );
};

export default OrderChangeContent;