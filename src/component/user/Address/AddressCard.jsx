const AddressCard = ({ addr, onEdit, onDelete,isSelected, onSelect }) => (
  
  <div className="border-b px-4 py-3">
    <div className="flex flex-wrap items-center gap-2 mb-1 font-semibold" 
    onClick={() => onSelect(addr)}>
      <input
      type="radio"
      name="selectedAddress"
      checked={isSelected}
      onChange={() => onSelect(addr)} // 클릭 시 부모(OrderPage)로 전달
      className="mt-1 mr-3 accent-blue-500 cursor-pointer"
    />
      
      <span>{addr.address} {addr.address_detail}</span>
      {addr.is_default && (
        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">기본배송지</span>
      )}
    </div>
    <div className="text-sm text-gray-700">{addr.zipcode}</div>
    {addr.note && <div className="text-sm text-gray-600">요청사항: {addr.note}</div>}
    <div className="mt-2 flex gap-2">
      <button
        className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-3 py-1 text-sm rounded transition"
        onClick={() => onEdit(addr)}
      >
        수정
      </button>
      <button
        className="text-red-600 border border-red-600 hover:bg-red-50 px-3 py-1 text-sm rounded transition"
        onClick={() => {
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
