const AddressCard = ({ addr, onEdit }) => (
  <div className="border-b px-4 py-3">
    <div className="flex flex-wrap items-center gap-2 mb-1 font-semibold">
      <span>{addr.address} {addr.address_detail}</span>
      {addr.is_default && (
        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">기본배송지</span>
      )}
    </div>
    <div className="text-sm text-gray-700">{addr.zipcode}</div>
    {addr.note && <div className="text-sm text-gray-600">요청사항: {addr.note}</div>}
    <div className="mt-2">
      <button
        className="text-blue-600 border px-2 py-0.5 text-sm rounded"
        onClick={() => onEdit(addr)}
      >
        수정
      </button>
    </div>
  </div>
);


export default AddressCard;
