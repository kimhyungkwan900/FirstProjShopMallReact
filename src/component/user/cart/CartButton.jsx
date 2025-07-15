import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCartItem, requestRestockAlarm, cancelRestockAlarm, IsRequestRestockAlarm } from "../../../api/user/cart/CartApi";
import { UserContext } from "../../common/Context/UserContext";

/**
 * CartButton 컴포넌트
 * - 상품 상태(판매중, 품절)에 따라 버튼 동작을 다르게 처리
 * - 판매중: 장바구니에 상품 추가
 * - 품절: 재입고 알림 신청 또는 취소
 */
const CartButton = ({ productId, status }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // 현재 로그인한 사용자 정보 가져오기
  const isLoggedIn = !!user?.id;            // 로그인 여부 판단

  // 재입고 알림 신청 여부를 저장하는 state (초기값: false)
  const [isAlarmRequested, setIsAlarmRequested] = useState(false);

  /**
   * 컴포넌트 마운트 시와 로그인 상태/상품 ID 변경 시
   * 서버에서 현재 상품에 대해 재입고 알림 신청 여부를 확인
   */
  useEffect(() => {
    const fetchAlarmStatus = async () => {
      if (!isLoggedIn) return; // 로그인하지 않은 경우 서버 요청 안 함
      try {
        const res = await IsRequestRestockAlarm(productId); // 서버에 신청 여부 확인 API 호출
        setIsAlarmRequested(res.data === true); // true면 신청된 상태로 버튼 표시
      } catch (error) {
        console.error("알림 상태 확인 실패:", error); // 에러 시 콘솔 출력
      }
    };
    fetchAlarmStatus();
  }, [productId, isLoggedIn]); // productId나 로그인 상태가 바뀔 때마다 실행

  /**
   * 🛒 장바구니에 상품을 추가하는 함수
   * - 로그인하지 않은 경우 로그인 페이지로 이동
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
      await addCartItem(productId, 1); // ✅ 장바구니에 상품 1개 추가 API 호출
      const confirmed = window.confirm(
        "상품이 장바구니에 추가되었습니다.\n장바구니로 이동하시겠습니까?"
      );
      if (confirmed) navigate("/cart"); // ✅ 사용자가 확인하면 장바구니 페이지로 이동
    } catch (error) {
      console.error("장바구니 추가 실패:", error); // 에러 시 콘솔 출력
      alert("장바구니 추가에 실패했습니다. 다시 시도해주세요."); // 사용자에게 알림
    }
  };

  /**
   * 재입고 알림 신청/취소 처리 함수
   * - 로그인하지 않은 경우 로그인 페이지로 이동
   * - 신청된 상태라면 취소 처리
   * - 신청되지 않은 상태라면 신청 처리
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
        // 이미 신청된 상태면 취소 처리
        await cancelRestockAlarm(productId);
        alert("재입고 알림이 취소되었습니다.");
        setIsAlarmRequested(false); // 버튼 상태 false로 변경
      } else {
        // 신청되지 않은 상태면 신청 처리
        await requestRestockAlarm(productId);
        setIsAlarmRequested(true); // 버튼 상태 true로 변경
        const response = window.confirm("재입고 알림이 신청되었습니다.\n마이페이지로 이동하시겠습니까?");
        if (response) {
          navigate("/restock/list"); // 마이페이지 재입고 알림 목록으로 이동
        }
      }
    } catch (error) {
      console.error("재입고 알림 처리 실패:", error); // 에러 시 콘솔 출력
      alert("알림 처리 중 오류가 발생했습니다."); // 사용자에게 알림
    }
  };

  // 버튼 렌더링
  // - 상품 상태가 판매중이면 장바구니 추가 버튼
  // - 품절이면 재입고 알림 신청/취소 버튼
  return (
    <button
      onClick={status === "판매중" ? handleAddToCart : handleRequestRestockAlarm}
      className={`${
        status === "판매중" ? "bg-blue-500" : "bg-gray-500"
      } text-white px-4 py-2 rounded w-50 h-12`}
    >
      {status === "판매중" ? "장바구니 담기" : 
        isAlarmRequested ? "재입고 알림 신청 취소" : "재입고 알림 신청"}
    </button>
  );
};

export default CartButton;
