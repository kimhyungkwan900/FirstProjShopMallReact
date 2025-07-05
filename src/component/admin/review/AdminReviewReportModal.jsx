import { useEffect, useState } from "react";
import { adminReviewReportList } from "../../../api/admin/review/AdminReviewReportApi";

const AdminReviewReportModal = ({ reviewId, onClose }) => {
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await adminReviewReportList(reviewId);
        if (Array.isArray(data)) {
          setReportList(data);
        } else if (data.reportList) {
          setReportList(data.reportList);
        } else {
          setReportList([]);
        }
      } catch (error) {
        console.error("신고 내역 불러오기 실패:", error);
        setReportList([]);
      }
    };

    if (reviewId) {
      fetchReports();
    }
  }, [reviewId]);

  return (
    <div className="fixed inset-1 bg-white/30 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] p-6 rounded-xl shadow-lg relative max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">신고 내역</h2>

        {reportList.length === 0 ? (
          <p className="text-gray-500">신고 내역이 없습니다.</p>
        ) : (
            <div className="space-y-4">
            {reportList.map((report, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <div className="flex justify-between">
                <div className="text-sm mb-1">
                  <span className="font-medium text-gray-700">신고자:</span> {report.memberId}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">신고일:</span> {new Date(report.createdAt).toLocaleString()}
                </div>
                </div>
                
                <div className="text-sm mb-1">
                  <span className="font-medium text-gray-700">사유:</span> {report.reason}
                </div>
                <div className="text-sm mb-1">
                  <span className="font-medium text-gray-700">내용:</span> {report.detail}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default AdminReviewReportModal;