import { useState } from "react";
import TrackingInputModal from "./TrackingInputModal";

const TrackingInputButton = ({ orderId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-400 text-white px-2 rounded"
      >
        운송장 등록
      </button>

      {isModalOpen && (
        <TrackingInputModal
          orderId={orderId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TrackingInputButton;