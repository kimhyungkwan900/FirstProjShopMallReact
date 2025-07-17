import React, { useState, useEffect } from "react";
import axios from "axios";
import { withCsrfForm } from "../../../utils/common/withCsrf";
import { useCsrfToken } from "../../../hooks/common/useCsrfToken";

const AddressForm = ({ selectedAddress, onSuccess, onCancel }) => {
  const csrfToken = useCsrfToken();
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
        await axios.put("/api/members/addresses", form, withCsrfForm(csrfToken)); // 수정
      } else {
        await axios.post("/api/members/addresses", form, withCsrfForm(csrfToken)); // 추가
      }
      onSuccess(); // 저장 후 목록 새로고침
    } catch (error) {
      console.error("주소 저장 실패", error);
      alert("주소 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-gray-300 rounded-xl shadow-sm p-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          우편번호
        </label>
        <input name="zipcode" value={form.zipcode} onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          placeholder="우편번호 입력"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          주소
        </label>
        <input
          name="address" value={form.address} onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          placeholder="주소 입력"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          상세 주소
        </label>
        <input
          name="address_detail" value={form.address_detail} onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          placeholder="상세 주소 입력"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          요청사항
        </label>
        <input
          name="note" value={form.note} onChange={onChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          placeholder="예: 문 앞에 놔주세요"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox" name="is_default" checked={form.is_default}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
        />
        <label className="ml-2 text-sm text-gray-700">
          기본 배송지로 설정
        </label>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button" onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          저장
        </button>
      </div>
    </form>
  );
};

export default AddressForm;