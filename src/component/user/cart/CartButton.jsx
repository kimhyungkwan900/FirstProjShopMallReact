import React, { useEffect, useState } from "react";
import { addCartItem, fetchUserInfo } from "../../../api/user/cart/CartApi";

const CartButton = ({ productId }) => {
  const [userId, setUserId] = useState(null);

  // ✅ 사용자 정보 불러오기
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const response = await fetchUserInfo();
        setUserId(response.data.memberId); // 사용자 ID 저장
      } catch (error) {
        console.error("사용자 정보를 불러오지 못했습니다:", error);
        alert("로그인이 필요합니다.");
      }
    };

    loadUserInfo();
  }, []);

  // ✅ 장바구니 추가
  const handleAddToCart = async () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await addCartItem(userId, productId, 1); // 수량 1개 추가
      alert("장바구니에 추가되었습니다.");
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      alert("장바구니 추가에 실패했습니다.");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
    >
      장바구니 담기
    </button>
  );
};

export default CartButton;
