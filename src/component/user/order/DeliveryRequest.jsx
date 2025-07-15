import React, { useState, useEffect } from "react";

/**
 * 배송 요청사항 입력 컴포넌트
 * - 선택된 배송지의 요청사항을 표시하고 수정할 수 있음
 * - 기본 옵션 선택 또는 직접 입력 가능
 */
const DeliveryRequest = ({ selectedAddress, onSaveRequest }) => {
  const [isCustomInput, setIsCustomInput] = useState(false); // textarea 표시 여부
  const [customText, setCustomText] = useState("");          // 직접 입력 내용
  const [selectedOption, setSelectedOption] = useState("");  // 현재 선택된 옵션
  const maxLength = 50;                                      // 요청사항 최대 글자 수

  // 🚨 selectedAddress.note가 변경될 때 초기화
  useEffect(() => {
    if (selectedAddress?.note?.trim()) {
      // note가 있으면 textarea 모드 활성화 및 내용 세팅
      setIsCustomInput(true);
      setCustomText(selectedAddress.note);
      setSelectedOption("직접 입력");
    } else {
      // note가 없으면 초기 상태로 리셋
      setIsCustomInput(false);
      setCustomText("");
      setSelectedOption("");
    }
  }, [selectedAddress?.note]); // note 값이 바뀔 때만 실행

  // 배송 요청사항 select 박스 변경 처리
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value === "직접 입력") {
      setIsCustomInput(true);       // textarea 표시
      onSaveRequest(customText);    // 현재 입력값 부모에 전달
    } else {
      setIsCustomInput(false);      // textarea 숨김
      onSaveRequest(value);         // 선택 옵션 부모에 전달
    }
  };

  // textarea 내용 변경 처리
  const handleTextareaChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setCustomText(value);
      onSaveRequest(value); // 실시간으로 부모에 전달
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">배송 요청사항</h2>

      {/* 요청사항 선택 드롭다운 */}
      <select
        value={isCustomInput ? "직접 입력" : selectedOption} // textarea 모드이면 항상 "직접 입력" 선택
        onChange={handleSelectChange}
        className="w-full p-3 text-[20px] text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
      >
        <option value="">문 앞에 놔주세요</option>
        <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
        <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
        <option value="배송 전에 연락 주세요">배송 전에 연락 주세요</option>
        <option value="직접 입력">직접 입력</option>
      </select>

      {/* 직접 입력 textarea */}
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