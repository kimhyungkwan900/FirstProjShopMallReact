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
    if (selectedAddress && selectedAddress.id) {
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
        await axios.put("/api/members/addresses", form);  // 수정
      } else {
        await axios.post("/api/members/addresses", form); // 추가
      }
      onSuccess(); // 저장 후 목록 새로고침
    } catch (error) {
      console.error("주소 저장 실패", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-4 border rounded mb-4 text-sm font-semibold">
      <div className="mb-2">
        <label className="block">우편번호</label>
        <input name="zipcode" value={form.zipcode} onChange={onChange} className="border p-1 w-full text-sm font-semibold" required />
      </div>
      <div className="mb-2">
        <label className="block">주소</label>
        <input name="address" value={form.address} onChange={onChange} className="border p-1 w-full text-sm font-semibold"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">상세 주소</label>
        <input name="address_detail" value={form.address_detail} onChange={onChange} className="border p-1 w-full text-sm font-semibold" required />
      </div>
      <div className="mb-2">
        <label className="block">요청사항</label>
        <input name="note" value={form.note} onChange={onChange} className="border p-1 w-full text-sm font-semibold" />
      </div>
      <div className="mb-2">
        <label className="inline-flex items-center">
          <input type="checkbox" name="is_default" checked={form.is_default} onChange={onChange}  className="mr-2" />기본 배송지로 설정
        </label>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="text-blue-500 text-sm font-semibold hover:underline mr-2">
          저장
        </button>
        <button type="button" onClick={onCancel} className="text-red-500 text-sm font-semibold hover:underline">
          취소
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
