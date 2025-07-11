import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressForm = ({ selectedAddress, onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    id: null,
    zipcode: "",
    address: "",
    address_detail: "",
    note: "",
    is_default: false,
  });

  useEffect(() => {
    if (selectedAddress) {
      setForm(selectedAddress);
    } else {
      setForm({
        id: null,
        zipcode: "",
        address: "",
        address_detail: "",
        note: "",
        is_default: false,
      });
    }
  }, [selectedAddress]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        // 수정
        await axios.put("/api/members/addresses", form);
      } else {
        // 추가
        await axios.post("/api/members/addresses", form);
      }
      onSuccess(); // 저장 후 목록 새로고침
    } catch (error) {
      console.error("주소 저장 실패", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-4 border rounded mb-4">
      <div className="mb-2">
        <label className="block">우편번호</label>
        <input name="zipcode" value={form.zipcode} onChange={onChange} className="border p-1 w-full" required />
      </div>
      <div className="mb-2">
        <label className="block">주소</label>
        <input name="address" value={form.address} onChange={onChange} className="border p-1 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">상세 주소</label>
        <input name="address_detail" value={form.address_detail} onChange={onChange} className="border p-1 w-full" required />
      </div>
      <div className="mb-2">
        <label className="block">요청사항</label>
        <input name="note" value={form.note} onChange={onChange} className="border p-1 w-full" />
      </div>
      <div className="mb-2">
        <label>
          <input type="checkbox" name="is_default" checked={form.is_default} onChange={onChange} />기본 배송지로 설정
        </label>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
          저장
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-1 rounded">
          취소
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
