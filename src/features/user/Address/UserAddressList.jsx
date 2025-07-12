import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../component/common/Context/UserContext";
import AddressCard from "../../../component/user/Address/AddressCard";
import AddressForm from "../../../component/user/Address/AddressForm";

const UserAddressList = () => {
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
        withCredentials: true
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
    <div className="w-2/3 mx-auto border rounded p-4">
      {editingAddress !== undefined && (
  <AddressForm
    selectedAddress={editingAddress} hasDefaultAddress={hasDefaultAddress} onSuccess={() => {
      setEditingAddress(undefined);
      fetchAddresses();
    }}
    onCancel={() => setEditingAddress(undefined)}
  />
)}

      {addresses.map((addr) => (
        <AddressCard key={addr.id} addr={addr} onEdit={() => setEditingAddress(addr)} onDelete={onDelete} />
      ))}
      {editingAddress !== null && (
        <div className="text-center py-3">
          <button
            onClick={() => setEditingAddress(null)}
            className="text-blue-500 text-sm font-semibold flex items-center justify-center mx-auto">
            <span className="mr-1 text-xl">+</span> 배송지 추가
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAddressList;
