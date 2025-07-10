import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandGroup from "../../../component/user/cart/BrandGroup";

const CartPage = () => {
  const navigate = useNavigate();

  // 장바구니 데이터 상태 (현재는 목데이터)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      brand: "브랜드A",
      name: "린넨 반팔 셔츠",
      price: 25000,
      quantity: 2,
      isSelected: false,
      imageUrl: "https://picsum.photos/150",
    },
    {
      id: 2,
      brand: "브랜드A",
      name: "린넨 긴팔 셔츠",
      price: 35000,
      quantity: 1,
      isSelected: false,
      imageUrl: "https://picsum.photos/150",
    },
    {
      id: 3,
      brand: "브랜드B",
      name: "코튼 팬츠",
      price: 45000,
      quantity: 1,
      isSelected: false,
      imageUrl: "https://picsum.photos/150",
    },
    {
      id: 4,
      brand: "브랜드C",
      name: "코튼 롱 스커트",
      price: 45000,
      quantity: 1,
      isSelected: false,
      imageUrl: "https://picsum.photos/150",
    },
  ]);

  const [total, setTotal] = useState({
    totalProductPrice: 0,
    deliveryFee: 0,
    grandTotal: 0,
  });

  const calculateTotal = (items) => {
    const selectedItems = items.filter((item) => item.isSelected);
    const totalProductPrice = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const deliveryFee = totalProductPrice >= 50000 ? 0 : 3000;
    const grandTotal = totalProductPrice + deliveryFee;
    return { totalProductPrice, deliveryFee, grandTotal };
  };

  const updateTotal = (items) => {
    const newTotal = calculateTotal(items);
    setTotal(newTotal);
  };

  useEffect(() => {
    updateTotal(cartItems);
  }, [cartItems]);

  const handleSelectAll = () => {
    const selectedItems = cartItems.filter((item) => item.isSelected);

  if (selectedItems.length === 0) {
    alert("주문할 상품을 선택해주세요.");
    return;
  }

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = totalPrice >= 50000 ? 0 : 3000;
  const grandTotal = totalPrice + deliveryFee;

  navigate("/order", {
    state: {
      selectedItems,
      total: {
        totalProductPrice: totalPrice,
        deliveryFee,
        grandTotal,
      },
    },
  });
  };

  const handleToggleSelectBrand = (brand, selectAll) => {
    const updatedItems = cartItems.map((item) =>
      item.brand === brand ? { ...item, isSelected: selectAll } : item
    );
    setCartItems(updatedItems);
    updateTotal(updatedItems);
  };

  const handleDeleteSelectedItems = () => {
    const updatedItems = cartItems.filter((item) => !item.isSelected);
    setCartItems(updatedItems);
    updateTotal(updatedItems);
  };

  const handleOrder = () => {
    const selectedItems = cartItems.filter((item) => item.isSelected);
    if (selectedItems.length === 0) {
      alert("주문할 상품을 선택해주세요.");
      return;
    }
    const response = window.confirm("주문하시겠습니까?");
    if(response){
      navigate("/order", { state: { selectedItems, total } });
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen px-4 py-6">
      <div className="flex w-full max-w-7xl gap-8">
        {/* 왼쪽: 장바구니 리스트 */}
        <div className="basis-[65%] bg-white rounded-3xl shadow-xl p-6 border border-gray-100 h-auto">
          {/* 헤더 */}
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
                checked={cartItems.every((item) => item.isSelected)}
                onChange={handleSelectAll}
                className="w-5 h-5 rounded border-gray-400 accent-blue-600 hover:accent-blue-700 cursor-pointer"
              />
              <span>전체 선택</span>
            </label>

            <button
              onClick={handleDeleteSelectedItems}
              className="text-[14px] bg-emerald-400 text-white font-semibold px-3 py-1.5 rounded-xl shadow hover:bg-emerald-500 transition"
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
                    if (!acc[item.brand]) acc[item.brand] = [];
                    acc[item.brand].push(item);
                    return acc;
                  }, {})
                ).map(([brand, items]) => (
                  <BrandGroup
                    key={brand}
                    brand={brand}
                    items={items}
                    onDeleteItem={(itemId) => {
                      const updatedItems = cartItems.filter(
                        (item) => item.id !== itemId
                      );
                      setCartItems(updatedItems);
                      updateTotal(updatedItems);
                    }}
                    onUpdateQuantity={(itemId, quantity) => {
                      if (quantity < 1) return;
                      const updatedItems = cartItems.map((item) =>
                        item.id === itemId ? { ...item, quantity } : item
                      );
                      setCartItems(updatedItems);
                      updateTotal(updatedItems);
                    }}
                    onToggleSelect={(itemId) => {
                      const updatedItems = cartItems.map((item) =>
                        item.id === itemId
                          ? { ...item, isSelected: !item.isSelected }
                          : item
                      );
                      setCartItems(updatedItems);
                      updateTotal(updatedItems);
                    }}
                    onToggleSelectBrand={handleToggleSelectBrand}
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
                <span>{total.totalProductPrice.toLocaleString()} 원</span>
              </div>

              <div className="flex justify-between mb-3 text-lg">
                <span>배송비</span>
                <span>{total.deliveryFee.toLocaleString()} 원</span>
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
