import { useState } from "react";
import TrackingInput from "./TrackingInput";

import { adminTrackingInput } from "../../../api/admin/tracking/TrackingInfoApi";
import { useCsrfToken } from "../../../hooks/common/useCsrfToken";

const TrackingInputModal = ({ orderId, onClose }) => {
  const [courier, setCourier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const csrfToken = useCsrfToken();

 const handleSubmit = async () => {
  if (!courier) {
    alert("택배사를 선택해주세요.");
    return;
  }

  if (!/^\d{10,13}$/.test(trackingNumber)) {
    alert("운송장 번호는 10~13자리 숫자여야 합니다.");
    return;
  }

  try {
    // ✅ API 호출
    await adminTrackingInput({
      orderId,
      courierCode: courier,
      trackingNumber,
      csrfToken,
    });

    alert("운송장 등록이 완료되었습니다.");
    onClose();

  } catch (error) {
    console.error("운송장 등록 실패", error);
    alert("운송장 등록 중 오류가 발생했습니다.");
  }
};
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">운송장 등록 (주문ID: {orderId})</h2>
        
        <TrackingInput
          courier={courier}
          setCourier={setCourier}
          trackingNumber={trackingNumber}
          setTrackingNumber={setTrackingNumber}
        />

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingInputModal;