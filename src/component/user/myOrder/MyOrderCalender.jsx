import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { format } from "date-fns";

const MyOrderCalendar = () => {
  const [startDate, setStartDate] = useState(new Date("2024-07-08"));
  const [endDate, setEndDate] = useState(new Date("2025-07-08"));

  const handleSearch = () => {
    alert(`주문 조회 기간: ${format(startDate, "yyyy.MM.dd")} ~ ${format(endDate, "yyyy.MM.dd")}`);
    // 여기서 주문 조회 API 호출 등 실행
  };

  return (
<div className="flex w-full flex-col items-center gap-4 py-2 rounded-lg mt-10">
  <div className="flex items-center gap-2 border border-blue-500 px-4 py-2 rounded-md">
    <DatePicker
      locale={ko}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="yyyy.MM.dd"
      selectsStart
      startDate={startDate}
      endDate={endDate}
      className="border-none font-semibold focus:outline-none"
    />
    <span className="text-xl font-bold">~</span>
    <DatePicker
      locale={ko}
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      dateFormat="yyyy.MM.dd"
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      minDate={startDate}
      className="border-none font-semibold focus:outline-none"
    />
    <button
      onClick={handleSearch}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
      주문 내역 조회
    </button>
  </div>
</div>
  );
};

export default MyOrderCalendar;