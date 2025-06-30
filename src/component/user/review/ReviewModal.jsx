const ReviewModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex  justify-center bg-black/40 backdrop-blur-sm">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-xl shadow-lg mt-20 mb-20">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          닫기
        </button>
        {children}
      </div>
    </div>
  );
};

export default ReviewModal;
