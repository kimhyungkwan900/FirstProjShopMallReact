import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCartItem, requestRestockAlarm, cancelRestockAlarm, IsRequestRestockAlarm } from "../../../api/user/cart/CartApi";
import { UserContext } from "../../common/Context/UserContext";

/**
 * CartButton 컴포넌트
 * - 상품 상태(판매중, 품절)에 따라 버튼 동작을 다르게 처리
 * - 판매중: 장바구니에 상품 추가
 * - 품절: 재입고 알림 신청
 */
const CartButton = ({ productId, status }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // 현재 로그인한 사용자 정보
  const isLoggedIn = !!user?.id;            // 로그인 여부 판단

  // 재입고 알림 신청 상태
  const [isAlarmRequested, setIsAlarmRequested] = useState();


  /**
   * 장바구니에 상품을 추가하는 함수
   * - 로그인하지 않은 경우 로그인 페이지로 이동 여부를 확인
   * - 상품 추가 후 사용자에게 장바구니 이동 여부를 물어봄
   */
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      const response = window.confirm("로그인이 필요합니다.\n로그인 하시겠습니까?");
      if (response) {
        navigate("/login"); // 로그인 페이지로 이동
      }
      return;
    }

    try {
      await addCartItem(productId, 1); // 장바구니에 상품 추가 API 호출
      const confirmed = window.confirm(
        "상품이 장바구니에 추가되었습니다.\n장바구니로 이동하시겠습니까?"
      );
      if (confirmed) navigate("/cart"); // 사용자가 확인하면 장바구니 페이지로 이동
      setIsAlarmRequested(true);
    } catch (error) {
      console.error("장바구니 추가 실패:", error);
      alert("장바구니 추가에 실패했습니다. 다시 시도해주세요.");
    }
  };
  

  /**
   * 재입고 알림을 신청하는 함수
   * - 로그인하지 않은 경우 로그인 페이지로 이동 여부를 확인
   * - 이미 신청된 경우 예외 처리
   */

  
  const handleRequestRestockAlarm = async () => {
    if (!isLoggedIn) {
      const response = window.confirm("로그인이 필요합니다.\n로그인 하시겠습니까?");
      if (response) {
        navigate("/login"); // 로그인 페이지로 이동
      }
      return;
    }

    try {
      if (isAlarmRequested) {
        // 이미 신청되어 있으면 취소 처리
        await cancelRestockAlarm(productId);
        alert("재입고 알림이 취소되었습니다.");
        setIsAlarmRequested(false);
      } else {
        // 신청되지 않은 경우 신청 처리
        await requestRestockAlarm(productId);
        setIsAlarmRequested(true);
        const response = window.confirm("재입고 알림이 신청되었습니다.\n 마이페이지로 이동하시겠습니까?");
        if(response){
          navigate("/restock/list",{state: { fromProductId: productId, alarmRequested: true }});
        }
      }
    } catch (error) {
      console.error("재입고 알림 처리 실패:", error);
      alert("알림 처리 중 오류가 발생했습니다.");
    }
  };
  return (
    <button
      onClick={status === "판매중" ? handleAddToCart : handleRequestRestockAlarm}
      className={`${
        status === "판매중" ? "bg-blue-500" : "bg-gray-500"
      } text-white px-4 py-2 rounded w-50 h-12`}
    >
      {status === "판매중" ? "장바구니 담기" : 
        isAlarmRequested ? "재입고 알림 신청 취소" : "재입고 알림 신청" }
        
    </button>
  );
};

export default CartButton;