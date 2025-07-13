import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addCartItem } from "../../../api/user/cart/CartApi";
import { UserContext } from "../../common/Context/UserContext";


const CartButton = ({productId, status}) => {
  const navigate = useNavigate();
  const {user} = useContext(UserContext); //현재 로그인 유저
  const isLoggedIn = !!user?.id;  //user?.id 있으면 true, 없으면 false

  const handleAddToCart = async () => {
    if(!isLoggedIn){
      const response = window.confirm("로그인이 필요합니다.\n로그인 하시겠습니까?");

      if(response) {
        navigate("/login");
      }
      return;
    }

    if(status === '판매중'){
      try {
        await addCartItem(productId, 1);
        const confirmed = window.confirm(
          "상품이 장바구니에 추가되었습니다.\n장바구니로 이동하시겠습니까?"
        );
        if (confirmed) navigate("/cart");
      } catch (error) {
        console.error("장바구니 추가 실패:", error);
        alert("장바구니 추가에 실패했습니다. 다시 시도해주세요.");
      }
    }else{
      alert("품절된 상품은 장바구니에 추가하실 수 없습니다.")
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
     장바구니 담기
    </button>
  );
};

export default CartButton;
