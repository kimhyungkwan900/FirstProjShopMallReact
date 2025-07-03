import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { reviewReportAction } from "../../../api/user/review/reviewReportApi";

const ReviewReportModal = ({ isOpen, onClose, reviewId }) => {
    const [reportReason, setReportReason] = useState("");
    const [detail, setDetail] = useState("");

    const memberId = 1;

    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 동작 방지
        if (!reportReason) {
            alert("신고 사유를 선택해주세요.");
            return;
        }

        try {
            await reviewReportAction({
            reviewId,
            memberId,
            reason: reportReason,
            detail,
            });
            alert("신고가 접수되었습니다.");
            onClose(); // 모달 닫기
            // 초기화도 선택적으로 가능
            setReportReason("");
            setDetail("");
        } catch (error) {
            console.error("신고 중 오류 발생:", error);
            console.log("신고 데이터", { reviewId, memberId, reason: reportReason, detail });
            alert("신고 처리 중 오류가 발생했습니다.");
        }
    };

    return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* 배경 */}
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm" aria-hidden="true" />

      {/* 모달 패널 */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white w-96 rounded-lg shadow-lg p-6">
          <Dialog.Title className="text-xl font-semibold mb-4 text-center">리뷰 신고</Dialog.Title>
          
          <select className="w-full border border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:ring-2"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                name="reason">
            <option value="" disabled hidden>신고 사유 선택</option>
            <option value="욕설">욕설</option>
            <option value="허위 정보">허위 정보</option>
            <option value="상품과 관련없음">상품과 관련없음</option>
          </select>
          
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none mt-3"
            placeholder="신고 사유를 입력하세요"
            name = "detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />

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
              신고 제출
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReviewReportModal;