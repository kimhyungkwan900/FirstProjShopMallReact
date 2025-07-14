import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../component/common/Context/UserContext";
import AddressCard from "../../../component/user/Address/AddressCard";
import AddressForm from "../../../component/user/Address/AddressForm";

const UserAddressList = ({ onSelect, tempSelectedAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(undefined);
  const [hasDefaultAddress, setHasDefaultAddress] = useState(false);
  const { user } = useContext(UserContext);

  const accessToken = localStorage.getItem("accessToken");


  const fetchAddresses = async () => {
    try {
      const res = await axios.get("/api/members/addresses", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const list = Array.isArray(res.data) ? res.data : [];
      setAddresses(list);

      // 기본 배송지 여부 체크
      const hasDefault = list.some((addr) => addr.is_default);
      setHasDefaultAddress(hasDefault);
    } catch (err) {
      console.error("배송지 목록을 불러오는 데 실패했습니다.", err);
    }
  };

  const onDelete = async (addressId) => {
    try {
      await axios.delete(`/api/members/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      fetchAddresses(); // 삭제 후 목록 갱신
    } catch (err) {
      console.error("주소 삭제 실패", err);
      alert("삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAddresses();
    }
  }, [user?.id]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      {editingAddress !== undefined && (
        <div className="mb-4">
          <AddressForm
            selectedAddress={editingAddress}
            hasDefaultAddress={hasDefaultAddress}
            onSuccess={() => {
              setEditingAddress(undefined);
              fetchAddresses();
            }}
            onCancel={() => setEditingAddress(undefined)}
          />
        </div>
      )}

      {editingAddress !== null && (
        <div className="text-center mb-5">
          <button
            onClick={() => setEditingAddress(null)}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition w-full">
            <span className="mr-2 text-lg">+</span> 새 배송지 추가
          </button>
        </div>
      )}

      <div className="space-y-3">
        {addresses.map((addr) => (
          <AddressCard
            key={addr.id} addr={addr} onEdit={() => setEditingAddress(addr)}
            onDelete={onDelete}
            onSelect={onSelect || (() => {})}
            isSelected={tempSelectedAddress?.id === addr.id}
            className={`rounded-lg border p-4 cursor-pointer transition-colors ${
              tempSelectedAddress?.id === addr.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          />
        ))}
      </div>

      
    </div>
  );
};

export default UserAddressList;