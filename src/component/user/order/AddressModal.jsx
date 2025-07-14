import React, { useState } from "react";
import UserAddressList from "../../../features/user/Address/UserAddressList";

/**
 * 주소 선택 모달 컴포넌트
 * - 배송지 목록을 보여주고 사용자가 주소를 선택할 수 있도록 함
 * - 선택 완료 시 부모 컴포넌트에 선택된 주소를 전달
 */
const AddressModal = ({ onClose, onConfirm }) => {
  // 모달 내에서 임시로 선택한 주소 상태
  const [tempSelectedAddress, setTempSelectedAddress] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* 모달 박스 */}
      <div className="bg-white p-6 rounded-2xl w-100% h-100% shadow-xl relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose} // 부모에게 모달 닫기 요청
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>

        {/* 주소 목록 컴포넌트 */}
        <UserAddressList
          onSelect={setTempSelectedAddress} // 주소 선택 시 상태 업데이트
          tempSelectedAddress={tempSelectedAddress} // 현재 선택된 주소 전달
        />

        {/* 선택 완료 버튼 */}
        <button
          onClick={() => {
            if (!tempSelectedAddress) {
              alert("배송지를 선택해주세요.");
              return;
            }
            onConfirm(tempSelectedAddress); // 부모에게 선택된 주소 전달
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
