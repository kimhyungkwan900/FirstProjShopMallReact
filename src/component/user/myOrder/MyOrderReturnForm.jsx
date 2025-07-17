import { useState, useEffect } from "react";
import { insertOrderReturn } from "../../../api/user/myOrder/MyOrderReturnApi";
import { useCsrfToken } from "../../../hooks/common/useCsrfToken";


const MyOrderReturnForm = ({ onClose, defaultType = "", orderId, memberId, onSuccess }) => {
const [returnType, setReturnType] = useState(defaultType || "");
const [reason, setReason] = useState("");
const [detail, setDetail] = useState("");

  const isCancel = defaultType === "CANCEL"; // 취소 신청인지 여부
  const csrfToken = useCsrfToken();

  useEffect(() => {
    if (isCancel) {
      setReturnType("CANCEL_REQUEST");
    }
  }, [isCancel]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!returnType || !reason) {
    alert("유형과 사유를 입력해주세요.");
    return;
  }

  const formData = {
    orderId,
    memberId,
    returnType,
    reason,
    detail,
  };
    try {
      console.log(csrfToken)
      await insertOrderReturn(formData, csrfToken);
      alert("신청이 완료되었습니다.");

      if (onSuccess) {
        onSuccess(returnType); // 성공 콜백 호출, 상태 갱신용으로 리턴 타입 넘김
      }

      onClose();
    } catch (error) {
      console.error("신청 실패", error);
      alert("신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <form onSubmit={handleSubmit}>
          {/* 신청 유형 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">신청 유형</label>
           {isCancel === true ? (
                <div className="text-3xl">취소 신청 <input type="hidden" value = {"CANCEL_REQUEST"}/></div>
            ) : (
            <select
              value={returnType}
              onChange={(e) => setReturnType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
              required>
              <option value="">-- 선택하세요 --</option>
              <option value="RETURN_REQUEST">반품 신청</option>
              <option value="EXCHANGE_REQUEST">교환 신청</option>
            </select>
            
            )}

          
          </div>

          {/* 사유 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">사유</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="간단한 사유 입력"
              required
            />
          </div>

          {/* 상세 내용 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">상세 내용</label>
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
              rows={6}
              placeholder="상세 내용을 입력해주세요"
            />
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              저장
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={onClose}
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyOrderReturnForm;