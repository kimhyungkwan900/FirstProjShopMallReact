import React, { useState } from "react";
import UserAddressList from "../../features/user/Address/UserAddressList";

const AddressModal = ({ onClose, onConfirm }) => {
  const [tempSelectedAddress, setTempSelectedAddress] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[600px] shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>
        <UserAddressList
          onSelect={setTempSelectedAddress}
          tempSelectedAddress={tempSelectedAddress}
        />
        <button
          onClick={() => {
            if (!tempSelectedAddress) {
              alert("배송지를 선택해주세요.");
              return;
            }
            onConfirm(tempSelectedAddress);
          }}
          className="mt-5 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          선택 완료
        </button>
      </div>
    </div>
  );
};

export default AddressModal;
