import React from "react";
import { useNavigate } from "react-router-dom";
import { addCartItem } from "../../../api/user/cart/CartApi";

const CartButton = ({ productId, quantity = 1 }) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      await addCartItem(productId, quantity);
      const confirmed = window.confirm(
        "상품이 장바구니에 추가되었습니다.\n장바구니로 이동하시겠습니까?"
      );
      if (confirmed) navigate("/cart");
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      alert("장바구니 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <button
      id={`add-to-cart-${productId}`} // ✅ id 추가
      name="add-to-cart"             // ✅ name 추가
      onClick={handleAddToCart}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
     장바구니 담기
    </button>
  );
};

export default CartButton;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCartItem } from "../../../api/user/cart/CartApi";


const CartButton=({memebrId, productId})=>{

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async() =>{
    if(loading) return;
    setloading(true); //중복방지

    try{
      await addCartItem(memebrId, productId, 1)
      const response = window.confirm("장바구니에 상품이 추가되었습니다.\n장바구니로 이동하시겠습니까?");

      if(response){
        navigate("/cart"); //장바구니 페이지로 이동
      }
    }catch(error){
      console.error("장바구니 추가 실패", error);
      alert("상품을 장바구니에 추가하지 못했습니다.");
    }finally{
      setloading(false);
    }

  }

  return(
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={`w-30 py-2 rounded-lg text-white transition duration-200 ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {loading ? "추가 중..." : "장바구니 담기"}
    </button>

  );
};

export default CartButton;