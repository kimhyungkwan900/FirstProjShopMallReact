import { useEffect, useState } from "react"
import { fetchCartItems, deleteCartItem,updateCartItemSelected, updateCartItemQuantity} from "../../../api/user/cart/CartApi";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]); // 장바구니 상품 목록 상태

  // 1. 장바구니 데이터 불러오기
  useEffect(() => {
    const loadCart = async () => {
      const data = await fetchCartItems(); // API로 장바구니 데이터 가져오기
      setCartItems(data);                  // 가져온 데이터로 상태 업데이트
    };
    loadCart();
  }, []); // 1번만 실행


  // 2. 개별 상품 선택/해제
  const toggleSelectItem = async (id) => {
    const item = cartItems.find((item) => item.id === id); // 선택한 상품 찾기
    await updateCartItemSelected(id, !item.selected);      // API 호출로 선택 상태 변경
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    ); // 상태 업데이트
  };

  // 3. 브랜드별 상품 선택/해제
  const toggleSelectBrand = async (brand, selectAll) => {
    // 선택한 브랜드의 모든 상품 필터링
    const brandItems = cartItems.filter((item) => item.brand === brand);

    // 각 상품 선택 상태를 API로 업데이트
    const updates = brandItems.map(async (item) => {
      await updateCartItemSelected(item.id, selectAll);
    });
    await Promise.all(updates); // 모든 API 호출이 끝날 때까지 기다림

    // 상태에서도 선택 상태 동기화
    setCartItems((prev) =>
      prev.map((item) =>
        item.brand === brand ? { ...item, selected: selectAll } : item
      )
    );
  };

  // 4. 전체 상품 선택/해제
  const toggleSelectAll = async (selectAll) => {
    // 모든 상품의 선택 상태를 API로 업데이트
    const updates = cartItems.map(async (item) => {
      await updateCartItemSelected(item.id, selectAll);
    });
    await Promise.all(updates); // 모든 API 호출 완료까지 대기

    // 상태에서도 선택 상태 동기화
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, selected: selectAll }))
    );
  };

  // 5. 수량 변경
  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 1) return; // 1개 미만으로 줄이려는 경우 무시
    await updateCartItemQuantity(id, quantity); // API로 수량 업데이트

    // 상태에서도 수량 반영
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // 6. 상품 삭제
  const handleDeleteItem = async (id) => {
    await deleteCartItem(id); // API로 삭제 요청
    // 상태에서 해당 상품 제거
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 7. 브랜드별로 상품 그룹화
  const groupByBrand = (items) => {
    const grouped = {}; // 브랜드명: [상품들] 형태의 객체 생성
    items.forEach((item) => {
      if (!grouped[item.brand]) grouped[item.brand] = []; // 브랜드 키가 없으면 새 배열 생성
      grouped[item.brand].push(item);                    // 해당 브랜드 배열에 상품 추가
    });
    return grouped;
  };

  // 8. 전체 선택 상태 계산
  const allSelected =
    cartItems.length > 0 && cartItems.every((item) => item.selected);
  // 👉 장바구니가 비어있지 않고 모든 상품이 선택됐을 때 true

  return (
    <div className="p-4">
      {/* 장바구니 타이틀 */}
      <div className="text-2xl font-bold mb-4">장바구니</div>

      {/* 전체 선택 체크박스 */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={allSelected} // 모든 상품이 선택됐는지 여부
          onChange={(e) => toggleSelectAll(e.target.checked)} // 체크박스 클릭 시 전체 선택/해제
        />
        <span className="font-semibold ml-2">전체 선택</span>
      </div>

      {/* 브랜드별 그룹핑 */}
      {Object.entries(groupByBrand(cartItems)).map(([brand, items]) => (
        <BrandGroup
          key={brand}                     // React key (필수)
          brand={brand}                    // 현재 브랜드 이름
          items={items}                    // 해당 브랜드의 상품 배열
          toggleSelectBrand={toggleSelectBrand}         // 브랜드별 선택 토글
          toggleSelectItem={toggleSelectItem}           // 개별 상품 선택 토글
          handleQuantityChange={handleQuantityChange}   // 수량 변경
          handleDeleteItem={handleDeleteItem}           // 상품 삭제
        />
      ))}
    </div>
  );
};

export default CartPage;