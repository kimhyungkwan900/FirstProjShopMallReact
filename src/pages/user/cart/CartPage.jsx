import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandGroup from "../../../component/user/cart/BrandGroup";
import {
  fetchCartItems,                 // ✅ API 호출: 장바구니 목록 조회
  updateCartItemQuantity,         // ✅ API 호출: 수량 변경
  toggleCartItemSelection,        // ✅ API 호출: 개별 선택/해제
  deleteSelectedItems,            // ✅ API 호출: 선택된 항목 삭제
  calculateTotalWithDelivery,     // ✅ API 호출: 총액 계산
  deleteCartItems,
  toggleCartAllSelection,
} from "../../../api/user/cart/CartApi";

const CartPage = () => {
  const navigate = useNavigate();
  

  const [cartItems, setCartItems] = useState([]); 
  const [total, setTotal] = useState({
    totalProductPrice: 0,
    deliveryFee: 0,
    grandTotal: 0,
  });

  

  // ✅ 장바구니 & 총액 API로 불러오기
  const loadCart = async () => {
  try {
    const response = await fetchCartItems(); // API 호출
    const items = Array.isArray(response.data) ? response.data : []; // 배열인지 확인
    setCartItems(items);
    await loadTotal();
    console.log("Cart Items:", items);

  } catch (error) {
    console.error("장바구니 불러오기 실패", error);
    setCartItems([]); // 에러 시에도 배열로 초기화
  }
};


const loadTotal = async () => {
  try {
    const response = await calculateTotalWithDelivery(); // API 호출
      setTotal({
        totalProductPrice: response.data.totalProductPrice,
        deliveryFee : response.data.minOrderAmount <= response.data.totalProductPrice ? 0 : response.data.deliveryFee,
        grandTotal: response.data.grandTotal,
      });

  } catch (error) {
    console.error("총액 계산 실패", error);
  }
};


  useEffect(() => {
    loadCart(); // ✅ 페이지 진입 시 API 호출
  }, []);
  
  

  // ✅ 개별 상품 선택/해제 (API 호출)
  const handleToggleSelect = async (itemId, isSelected) => {
    try {
      await toggleCartItemSelection(itemId, isSelected); // API 호출
      await loadCart(); // 변경 후 장바구니 새로고침
    } catch (error) {
      console.error("선택 상태 변경 실패", error);
    }
  };

  // ✅ 수량 변경 (API 호출)
  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartItemQuantity(itemId, quantity); // API 호출
      await loadCart();
    } catch (error) {
      console.error("수량 변경 실패", error);
    }
  };

  // ✅ 선택된 상품 삭제 (API 호출)
  const handleDeleteSelectedItems = async (items) => {
    const isSelected = items.some((item) => item._selected);

    if(isSelected){
      try {
        await deleteSelectedItems(); // API 호출
        await loadCart();
      } catch (error) {
        console.error("선택된 상품 삭제 실패", error);
      }
    }else{
      alert("삭제할 상품을 선택해주세요.")
    }
  };

  // ✅ 주문 페이지로 이동
  const handleOrder = async() => {
    const selectedItems = cartItems.filter((item) => item._selected);
    if (selectedItems.length === 0) {
      alert("주문할 상품을 선택해주세요.");
      return;
    }
    const response = window.confirm("주문하시겠습니까?");
    if (response) {
      navigate("/order", { state: { selectedItems, total } });
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen px-4 py-6">
      <div className="flex w-full max-w-7xl gap-8">
        {/* 왼쪽: 장바구니 리스트 */}
        <div className="basis-[65%] bg-white rounded-3xl shadow-xl p-6 border border-gray-100 h-auto">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200 px-4 py-4 rounded-t-3xl">
            <h1 className="text-3xl font-extrabold text-black flex items-center gap-2">
              🛒 장바구니
            </h1>
          </div>

          {/* 전체 선택 및 선택 삭제 버튼 */}
          <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50 rounded-b-xl">
            <label className="flex items-center gap-3 text-lg font-medium">
              <input
                type="checkbox"
                checked={cartItems.every((item) => item._selected)}
                onChange={async () => {
                  try {
                    const isAllSelected = cartItems.every((item) => item._selected);
                    await toggleCartAllSelection(!isAllSelected);
                    await loadCart();
                    loadTotal();
                  } catch (error) {
                    console.error("❌ 전체 선택 API 호출 실패", error);
                  }
                }}
                className="w-5 h-5 rounded border-gray-400 accent-blue-600 hover:accent-blue-700 cursor-pointer"
              />

              <span>전체 선택</span>
            </label>

            <button
              onClick={() => handleDeleteSelectedItems(cartItems)}
              className="text-[14px] border-gray-400 border-1 text-black font-semibold px-3 py-1.5 rounded-xl shadow hover:bg-gray-300 transition"
            >
              선택 삭제
            </button>
          </div>

          {/* 장바구니 아이템 목록 */}
          <div className="px-4 py-6 space-y-5">
            {cartItems.length === 0 ? (
              <p className="text-xl text-center text-gray-500 mt-10">
                장바구니가 비어 있습니다.
              </p>
            ) : (
              <>
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
                        await deleteCartItems(itemId); // ✅ API 호출: 개별 삭제
                        await loadCart();
                      } catch (error) {
                        console.error("상품 삭제 실패", error);
                      }
                    }}
                    onUpdateQuantity={handleUpdateQuantity}
                    onToggleSelect={(itemId) => {
                      const currentItem = cartItems.find((item) => item.id === itemId);
                      handleToggleSelect(itemId, !currentItem.isSelected);
                    }}
                    onToggleSelectBrand={async (brand, selectAll) => {
                      try {
                        const brandItems = cartItems.filter((item) => item.brand === brand);
                        for (const item of brandItems) {
                          await toggleCartItemSelection(item.id, selectAll); // ✅ API 호출: 브랜드별 선택/해제
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

        {/* 오른쪽: 총액 및 결제 */}
        <div className="basis-[35%] min-w-[300px]">
          <div className="sticky top-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-5 text-gray-800">구매 금액</h2>

              <div className="flex justify-between mb-3 text-lg">
                <span>상품 합계</span>
                <span>{(total.totalProductPrice ?? 0).toLocaleString()} 원</span>
              </div>
              
              <div className="flex justify-between mb-3 text-lg">
                <span>배송비</span>
                <span>{total.deliveryFee === 0 ? 0 : `${total.deliveryFee.toLocaleString()}`} 원</span>
              </div>

              <div className="flex justify-between mb-3 text-[15px] text-gray-400">
                <span>5만원 이상 구매시 무료 배송</span>
              </div>

              <div className="flex justify-between mb-5 text-xl font-bold border-t pt-4">
                <span>총액</span>
                <span className="text-green-600">
                  {(total.grandTotal ?? 0).toLocaleString()} 원
                </span>
              </div>

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
