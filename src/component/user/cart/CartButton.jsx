import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addCartItem } from "../../../api/user/cart/CartApi";
import { UserContext } from "../../common/Context/UserContext";
import { requestRestockAlarm } from "../../../api/user/cart/CartApi";


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
    }

    const handleRequestRestockAlarm = async(item) =>{
      if(!isLoggedIn){
      const response = window.confirm("로그인이 필요합니다.\n로그인 하시겠습니까?");

      if(response) {
        navigate("/login");
      }
      return;
    }

    try{
      await requestRestockAlarm(productId);
      alert("재입고 알림이 신청되었습니다.");
    }catch(error){
      console.error("재입고 알림 신청 실패 : " , error);
      alert("이미 재입고 알람이 신청되었습니다.");
    }
  }


  return (
    <button
      onClick={status === "판매중" ? handleAddToCart : handleRequestRestockAlarm}
      className={`${status==="판매중" ? "bg-blue-500" : "bg-gray-500"} text-white px-4 py-2 rounded w-40 h-12`}
    >
     {status === "판매중" ? "장바구니 담기" : "재입고 알림 신청"}
    </button>
  );
};

export default CartButton;
