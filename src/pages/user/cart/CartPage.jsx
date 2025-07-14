import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandGroup from "../../../component/user/cart/BrandGroup";
import {
  fetchCartItems,              // 장바구니 아이템 목록 가져오기 API
  updateCartItemQuantity,      // 장바구니 상품 수량 변경 API
  toggleCartItemSelection,     // 개별 상품 선택/해제 API
  deleteSelectedItems,         // 선택된 상품 삭제 API
  calculateTotalWithDelivery,  // 총액 및 배송비 계산 API
  deleteCartItems,             // 개별 상품 삭제 API
  toggleCartAllSelection,      // 전체 상품 선택/해제 API
} from "../../../api/user/cart/CartApi";

const CartPage = () => {
  const navigate = useNavigate(); // 페이지 이동 훅

  // 장바구니 상품 목록 상태
  const [cartItems, setCartItems] = useState([]);
  // 결제 총액 상태 (상품 합계, 배송비, 총 결제금액)
  const [total, setTotal] = useState({
    totalProductPrice: 0,
    deliveryFee: 0,
    grandTotal: 0,
  });

  // 장바구니 및 총액 API 호출 함수
  const loadCart = async () => {
    try {
      const response = await fetchCartItems(); // 장바구니 아이템 가져오기 API 호출
      const items = Array.isArray(response.data) ? response.data : []; // 배열인지 체크
      setCartItems(items); // 상태 업데이트
      await loadTotal(); // 총액 계산
      console.log("Cart Items:", items);
    } catch (error) {
      console.error("장바구니 불러오기 실패", error);
      setCartItems([]); // 에러 시 빈 배열로 초기화
    }
  };

  // 총액 계산 함수
  const loadTotal = async () => {
    try {
      const response = await calculateTotalWithDelivery(); // 총액 계산 API 호출
      setTotal({
        totalProductPrice: response.data.totalProductPrice,
        deliveryFee:
          response.data.minOrderAmount <= response.data.totalProductPrice
            ? 0 // 조건 충족 시 무료배송
            : response.data.deliveryFee,
        grandTotal: response.data.grandTotal,
      });
    } catch (error) {
      console.error("총액 계산 실패", error);
    }
  };

  // 페이지 진입 시 장바구니 불러오기
  useEffect(() => {
    loadCart(); // 첫 렌더링 시 실행
  }, []);

  // 개별 상품 선택/해제 처리
  const handleToggleSelect = async (itemId, isSelected) => {
    try {
      await toggleCartItemSelection(itemId, isSelected); // 선택 상태 API 호출
      await loadCart(); // 상태 새로고침
    } catch (error) {
      console.error("선택 상태 변경 실패", error);
    }
  };

  // 개별 상품 수량 변경 처리
  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return; // 1 미만 방지
    try {
      await updateCartItemQuantity(itemId, quantity); // 수량 변경 API 호출
      await loadCart();
    } catch (error) {
      console.error("수량 변경 실패", error);
    }
  };

  // 선택된 상품 삭제 처리
  const handleDeleteSelectedItems = async (items) => {
    const isSelected = items.some((item) => item._selected); // 선택된 상품 있는지 확인
    if (isSelected) {
      try {
        await deleteSelectedItems(); // 선택 삭제 API 호출
        await loadCart();
      } catch (error) {
        console.error("선택된 상품 삭제 실패", error);
      }
    } else {
      alert("삭제할 상품을 선택해주세요."); // 경고창
    }
  };

  // 주문 페이지로 이동
  const handleOrder = async () => {
    const selectedItems = cartItems.filter((item) => item._selected); // 선택된 상품만 추출
    if (selectedItems.length === 0) {
      alert("주문할 상품을 선택해주세요.");
      return;
    }
    const response = window.confirm("주문하시겠습니까?"); // 확인창
    if (response) {
      navigate("/order", { state: { selectedItems, total } }); // 주문 페이지로 이동
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen px-4 py-6">
      <div className="flex w-full max-w-7xl gap-8">
        {/* 왼쪽: 장바구니 리스트 영역 */}
        <div className="basis-[65%] bg-white rounded-3xl shadow-xl p-6 border border-gray-100 h-auto">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200 px-4 py-4 rounded-t-3xl">
            <h1 className="text-3xl font-extrabold text-black flex items-center gap-2">
              🛒 장바구니
            </h1>
          </div>

          {/* 전체 선택 & 선택 삭제 버튼 */}
          <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50 rounded-b-xl">
            <label className="flex items-center gap-3 text-lg font-medium">
              {/* 전체 선택 체크박스 */}
              <input
                type="checkbox"
                checked={cartItems.every((item) => item._selected)} // 모든 상품 선택 여부
                onChange={async () => {
                  try {
                    const isAllSelected = cartItems.every(
                      (item) => item._selected
                    );
                    await toggleCartAllSelection(!isAllSelected); // 전체 선택/해제 API 호출
                    await loadCart(); // 상태 새로고침
                    loadTotal();
                  } catch (error) {
                    console.error("❌ 전체 선택 API 호출 실패", error);
                  }
                }}
                className="w-5 h-5 rounded border-gray-400 accent-blue-600 hover:accent-blue-700 cursor-pointer"
              />
              <span>전체 선택</span>
            </label>

            {/* 선택 삭제 버튼 */}
            <button
              onClick={() => handleDeleteSelectedItems(cartItems)}
              className="text-[14px] border-gray-400 border-1 text-black font-semibold px-3 py-1.5 rounded-xl shadow hover:bg-gray-300 transition"
            >
              선택 삭제
            </button>
          </div>

          {/* 장바구니 아이템 목록 출력 */}
          <div className="px-4 py-6 space-y-5">
            {cartItems.length === 0 ? (
              <p className="text-xl text-center text-gray-500 mt-10">
                장바구니가 비어 있습니다.
              </p>
            ) : (
              <>
                {/* 브랜드별로 그룹화하여 BrandGroup 컴포넌트로 전달 */}
                {Object.entries(
                  cartItems.reduce((acc, item) => {
                    if (!acc[item.brandName]) acc[item.brandName] = [];
                    acc[item.brandName].push(item);
                    return acc;
                  }, {})
                ).map(([brand, items]) => (
                  <BrandGroup
                    key={brand}
                    brand={brand}
                    items={items}
                    setCartItems={setCartItems}
                    updateTotal={loadTotal}
                    loadCart={loadCart}
                    onDeleteItem={async (itemId) => {
                      try {
                        await deleteCartItems(itemId); // 개별 삭제 API 호출
                        await loadCart();
                      } catch (error) {
                        console.error("상품 삭제 실패", error);
                      }
                    }}
                    onUpdateQuantity={handleUpdateQuantity} // 수량 변경 핸들러
                    onToggleSelect={(itemId) => {
                      const currentItem = cartItems.find(
                        (item) => item.id === itemId
                      );
                      handleToggleSelect(itemId, !currentItem.isSelected); // 개별 선택/해제
                    }}
                    onToggleSelectBrand={async (brand, selectAll) => {
                      try {
                        const brandItems = cartItems.filter(
                          (item) => item.brand === brand
                        );
                        for (const item of brandItems) {
                          await toggleCartItemSelection(
                            item.id,
                            selectAll
                          ); // 브랜드별 선택/해제 API 호출
                        }
                        await loadCart();
                      } catch (error) {
                        console.error("브랜드별 선택 실패", error);
                      }
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        {/* 오른쪽: 결제 총액 영역 */}
        <div className="basis-[35%] min-w-[300px]">
          <div className="sticky top-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-5 text-gray-800">
                구매 금액
              </h2>

              {/* 상품 합계 */}
              <div className="flex justify-between mb-3 text-lg">
                <span>상품 합계</span>
                <span>
                  {(total.totalProductPrice ?? 0).toLocaleString()} 원
                </span>
              </div>

              {/* 배송비 */}
              <div className="flex justify-between mb-3 text-lg">
                <span>배송비</span>
                <span>
                  {total.deliveryFee === 0
                    ? 0
                    : `${total.deliveryFee.toLocaleString()}`}{" "}
                  원
                </span>
              </div>

              {/* 무료배송 안내 */}
              <div className="flex justify-between mb-3 text-[15px] text-gray-400">
                <span>5만원 이상 구매시 무료 배송</span>
              </div>

              {/* 총 결제금액 */}
              <div className="flex justify-between mb-5 text-xl font-bold border-t pt-4">
                <span>총액</span>
                <span className="text-green-600">
                  {(total.grandTotal ?? 0).toLocaleString()} 원
                </span>
              </div>

              {/* 주문 버튼 */}
              <button
                onClick={handleOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-2xl shadow-lg transition-colors"
              >
                상품 주문하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;