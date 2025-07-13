import React, { useState, useEffect } from "react";

const DeliveryRequest = ({ selectedAddress, onSaveRequest }) => {
  const [isCustomInput, setIsCustomInput] = useState(false); // textarea 표시 여부
  const [customText, setCustomText] = useState(""); // 직접 입력 내용
  const [selectedOption, setSelectedOption] = useState(""); // 현재 선택된 옵션
  const maxLength = 50;

  // 🚨 selectedAddress.note가 변경될 때만 초기화
  useEffect(() => {
    if (selectedAddress?.note?.trim()) {
      setIsCustomInput(true); // note 있으면 textarea 모드
      setCustomText(selectedAddress.note); // note 값 넣기
      setSelectedOption("직접 입력"); // select 박스는 "직접 입력"으로 보이도록
    } else {
      setIsCustomInput(false); // textarea 숨김
      setCustomText("");
      setSelectedOption(""); // 기본 옵션으로
    }
  }, [selectedAddress?.note]); // ❗ note 변경 시만 실행

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value); // 선택된 옵션 상태 변경

    if (value === "직접 입력") {
      setIsCustomInput(true); // textarea 표시
      onSaveRequest(customText); // 현재 입력된 값 전달
    } else {
      setIsCustomInput(false); // textarea 숨김
      onSaveRequest(value); // 선택된 옵션 전달
    }
  };

  const handleTextareaChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setCustomText(value);
      onSaveRequest(value); // textarea 내용 실시간 저장
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">배송 요청사항</h2>

      <select
        value={isCustomInput ? "직접 입력" : selectedOption} // ✅ 직접 입력 상태 아니면 선택 옵션 보여줌
        onChange={handleSelectChange}
        className="w-full p-3 text-[20px] text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
      >
        <option value="">문 앞에 놔주세요</option>
        <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
        <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
        <option value="배송 전에 연락 주세요">배송 전에 연락 주세요</option>
        <option value="직접 입력">직접 입력</option>
      </select>

      {/* ✨ 직접 입력 textarea */}
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
  );
};

export default DeliveryRequest;
