const OrderFilterButton = ({ onFilterChange, activeType }) => {
  const buttons = [
    { label: "전체", value: "ALL" },
    { label: "취소", value: "CANCEL" },
    { label: "교환", value: "EXCHANGE" },
    { label: "반품", value: "RETURN" },
  ];

  return (
    <div className="flex justify-center gap-4 my-4">
      {buttons.map((btn) => (
        <button
          key={btn.value}
          onClick={() => onFilterChange(btn.value)}
          className={`px-5 py-2 rounded-full border text-sm font-semibold transition 
                      ${
                        activeType === btn.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                      }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default OrderFilterButton;
