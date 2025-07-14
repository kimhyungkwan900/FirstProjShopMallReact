const AddressCard = ({ addr, onEdit, onDelete, isSelected, onSelect }) => (
  <div
    className={`flex justify-between items-start p-4 rounded-lg border ${
      isSelected
        ? "border-blue-500 bg-blue-50"
        : "border-gray-200 hover:bg-gray-50 transition-colors"
    }`}
    onClick={() => onSelect(addr)}
  >
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <input
          type="radio"
          name="selectedAddress"
          checked={isSelected}
          onChange={() => onSelect(addr)}
          className="accent-blue-500 cursor-pointer"
        />
        <span className="font-semibold text-gray-800">
          {addr.address} {addr.address_detail}
        </span>
        {addr.is_default && (
          <span className=" mr-4 ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
            기본 배송지
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 font-bold">{addr.zipcode}</p>
      {addr.note && (
        <p className="text-sm text-gray-500 mt-1">요청사항 : {addr.note}</p>
      )}
    </div>

    <div className="flex gap-2 mt-1">
      <button
        className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-3 py-1 text-sm rounded transition"
        onClick={(e) => {
          e.stopPropagation(); // 부모 클릭 방지
          onEdit(addr);
        }}
      >
        수정
      </button>
      <button
        className="text-red-600 border border-red-600 hover:bg-red-50 px-3 py-1 text-sm rounded transition"
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm("정말 삭제하시겠습니까?")) {
            onDelete(addr.id);
          }
        }}
      >
        삭제
      </button>
    </div>
  </div>
);

export default AddressCard;
