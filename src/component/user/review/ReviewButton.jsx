import { useState } from "react";
import ReviewModal from "./ReviewModal";
import ReviewContent from "./ReviewContent";

const ReviewButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded ">
        리뷰 목록
      </button>

      <ReviewModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-4">
          <h2 className="text-lg font-bold text-center mb-5">리뷰 목록</h2>
          <hr className="mb-5"/>
            <ReviewContent/>
        </div>
      </ReviewModal>
    </div>
  );
};

export default ReviewButton;