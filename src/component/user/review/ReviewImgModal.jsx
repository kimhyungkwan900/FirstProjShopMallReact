import { Dialog } from "@headlessui/react";
import { useState } from "react";

const ReviewImgModal = ({ isOpen, onClose, images }) => {
  const BASE_URL = "http://localhost:8080";
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-3xl w-full text-center">
          <Dialog.Title className="text-xl font-bold mb-4">리뷰 이미지</Dialog.Title>=
          {/* 슬라이드 이미지 */}
          {images.length > 0 && (
            <div className="relative">
              <img
                src={`${BASE_URL}${images[currentIndex].filePath}`}
                alt="리뷰 이미지"
                className="mx-auto h-[500px] object-contain rounded w-[600px]"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 text-6xl text-gray-700 hover:text-black"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 text-6xl text-gray-700 hover:text-black"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            닫기
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReviewImgModal;
