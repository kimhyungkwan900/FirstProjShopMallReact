import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { adminReviewBlindAction } from "../../../api/admin/review/AdminReviewBlindAPi";
import { useCsrfToken } from "../../../hooks/common/useCsrfToken";
const AdminReviewBlindModal = ({ isOpen, onClose, reviewId, onBlindSuccess }) => {
    const [blindReason, setBlindReason] = useState("");
    const csrfToken = useCsrfToken();

    const adminId = 1;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!blindReason) {
            alert("블라인드 사유 선택");
            return;
        }
        try {
            await adminReviewBlindAction({
                reviewId,
                adminId,
                reason: blindReason,
                csrfToken,
            });
            alert("블라인드가 처리되었습니다.");
            onClose();
            setBlindReason("");
            // ✅ 블라인드 성공 콜백 호출
            onBlindSuccess && onBlindSuccess(reviewId, blindReason);
        } catch (error) {
            console.error("블라인드 실패", error);
            alert("블라인드 실패");
        }
    };

    return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* 배경 */}
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm" aria-hidden="true" />

      {/* 모달 패널 */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white w-96 rounded-lg shadow-lg p-6">
          <Dialog.Title className="text-xl font-semibold mb-4 text-center">블라인드처리</Dialog.Title>
          
          <select className="w-full border border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:ring-2"
                value={blindReason}
                onChange={(e) => setBlindReason(e.target.value)}
                name="reason">
            <option value="" disabled hidden>블라인드 사유 선택</option>
            <option value="욕설">욕설</option>
            <option value="허위 정보">허위 정보</option>
            <option value="상품과 관련없음">상품과 관련없음</option>
          </select>
          
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleSubmit}
            >
              블라인드 처리 
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AdminReviewBlindModal;