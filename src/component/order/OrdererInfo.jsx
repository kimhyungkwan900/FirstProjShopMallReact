import React, { useState, useEffect } from "react";

const OrdererInfo = ({ user, selectedAddress, onOpenModal, onRequestChange }) => {
  const [isCustomInput, setIsCustomInput] = useState(false); // textarea 표시 여부
  const [customText, setCustomText] = useState(""); // 직접 입력 내용
  const [selectedOption, setSelectedOption] = useState(""); // 현재 선택된 옵션
  const maxLength = 50;

  // 🚨 selectedAddress.note가 변경될 때만 초기화
  useEffect(() => {
    if (selectedAddress?.note?.trim()) {
      setIsCustomInput(true);
      setCustomText(selectedAddress.note);
      setSelectedOption("직접 입력");
    } else {
      setIsCustomInput(false);
      setCustomText("");
      setSelectedOption("");
    }
  }, [selectedAddress?.note]);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value === "직접 입력") {
      setIsCustomInput(true);
      onRequestChange(customText);
    } else {
      setIsCustomInput(false);
      onRequestChange(value);
    }
  };

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setCustomText(value);
      onRequestChange(value);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-6 bg-gray-50 rounded-2xl shadow border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-3xl font-bold text-gray-900">{user.nickname}</p>
          <p className="text-2xl font-semibold text-gray-700">
            {user.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}
          </p>

          {selectedAddress ? (
            <div className="text-2xl text-gray-900 space-y-1 leading-relaxed">
              <div className="flex gap-3">
                <p>{selectedAddress.address}</p>
                <p>{selectedAddress.address_detail}</p>
              </div>
            </div>
          ) : (
            <p className="text-red-500 font-medium">배송지를 선택해주세요</p>
          )}
        </div>
        <button
          onClick={onOpenModal}
          className="px-5 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-md transition-all"
        >
          배송지 변경
        </button>
      </div>

      {/* 🚚 배송 요청사항 */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">배송 요청사항</h2>

        <select
          value={isCustomInput ? "직접 입력" : selectedOption}
          onChange={handleSelectChange}
          className="w-full p-3 text-[20px] text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
        >
          <option value="">문 앞에 놔주세요</option>
          <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
          <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
          <option value="배송 전에 연락 주세요">배송 전에 연락 주세요</option>
          <option value="직접 입력">직접 입력</option>
        </select>

        {isCustomInput && (
          <div className="mt-2">
            <textarea
              placeholder="최대 50자까지 입력 가능합니다."
              value={customText}
              onChange={handleTextareaChange}
              className="w-full p-3 text-[20px] text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              rows="3"
            />
            <div className="flex justify-between items-center mt-1 text-md text-gray-500">
              <span>최대 {maxLength}자까지 입력 가능합니다.</span>
              <span>{customText.length}/{maxLength}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdererInfo;
