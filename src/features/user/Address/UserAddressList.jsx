import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../component/common/Context/UserContext";
import AddressCard from "../../component/common/AddressCard";
import AddressForm from "../../component/common/AddressForm";

const UserAddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const { user } = useContext(UserContext);

  const accessToken = localStorage.getItem("accessToken");

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("/api/members/addresses", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setAddresses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("배송지 목록을 불러오는 데 실패했습니다.", err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAddresses();
    }
  }, [user?.id]);

  return (
    <div className="w-full border rounded p-4">
      {editingAddress !== null && (
        <AddressForm
          selectedAddress={editingAddress}
          onSuccess={() => {
            setEditingAddress(null);
            fetchAddresses();
          }}
          onCancel={() => setEditingAddress(null)}
        />
      )}

      {addresses.map((addr) => (
        <AddressCard key={addr.id} addr={addr} onEdit={() => setEditingAddress(addr)} />
      ))}

      <div className="text-center py-3">
        <button
          onClick={() => setEditingAddress(null)} // 빈 폼 보여주기
          className="text-blue-500 text-sm font-semibold flex items-center justify-center mx-auto"
        >
          <span className="mr-1 text-xl">+</span> 배송지 추가
        </button>
      </div>
    </div>
  );
};

export default UserAddressList;
