import { Dialog } from "@headlessui/react";



const ReviewImgModal = ({ isOpen, onClose, images }) => {
    const BASE_URL = "http://localhost:8080";

    return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-4 rounded-lg max-w-3xl w-full">
          <Dialog.Title className="text-xl font-bold mb-2">리뷰 이미지</Dialog.Title>
          <div className="grid grid-cols-2 gap-4">
            {images.map((img) => (
              <img
                key={img.id}
                src={`${BASE_URL}${img.filePath}`}
                alt="리뷰 이미지"
                className="w-full object-contain rounded"
              />
            ))}
          </div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            닫기
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};