import { useState } from "react";
import ReviewModal from "./ReviewModal";
import ReviewContent from "./ReviewContent";

const ReviewButton = ({productId}) => {
  const memberId = 1;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded ">
        리뷰 목록
      </button>
        <ReviewModal isOpen={isModalOpen}>
        <div className="p-4 flex flex-col max-h-[70vh] overflow-y-auto">
          <h2 className="text-lg font-bold text-center mb-5">리뷰 목록</h2>
          <hr className="mb-5"/>
          <ReviewContent productId={productId} memberId = {memberId}/>
        </div>
        
        <div className="w-full flex justify-center mt-6">
          <button
          onClick={closeModal}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            닫기
          </button>
        </div>
      </ReviewModal>
    </div>
  );
};

export default ReviewButton;