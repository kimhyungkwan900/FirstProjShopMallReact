// 장바구니 화면 전체 레이아웃을 담당

import React, {userState} from 'react';
import CartHeader from './CartHeader';
import CartItemList from './CartItemList';
import CouponBox from './CouponBox';
import CartFooter from './CartFooter';
import { toggleWishlistItem } from '../../../api/user/product/wishlistApi';

const CartPage = () =>{

    const [cartItems, serCartItems] = userState([
        {
      id: 1,
      brand: '나이키',
      name: '에어맥스 270',
      thumbnail: 'https://via.placeholder.com/100',
      option: 'M',
      quantity: 1,
      price: 129000,
      selected : false,
    },
    {
      id: 2,
      brand: '아디다스',
      name: '울트라부스트',
      thumbnail: 'https://via.placeholder.com/100',
      option: 'L',
      quantity: 2,
      price: 179000,
      selected : false,
    },
    ]);

    // 상품 수량 변경
    const updateQuantity = (id, quantity) =>{
        serCartItems((prev) => 
            //prev : 현재 장바구니 배열
            //map : 배열의 각 요소 item을 하나씩 순회한다.
            prev.map((item) => (
                item.id === id ? {...item, quantity : Math.max(quantity,1)} : item
            ))
        );
    };

    // 상품 옵션 변경
    const updateOpton = (id, option) =>{
        serCartItems((prev) =>
            prev.map((item)=>(
                item.id === id ? {...item, option} : item
            ))
        );
    };

    // 상품 삭제
    const deleteItem = (id) =>{
        serCartItems((prev)=>{
            //조건에 맞는 요소만 남겨 새 배열 반환
            prev.filter((item) =>{
                item.id !== id
            })
        });
    };

    // 선택 상태 변경
    const toggleSelectedItems = (id) =>{
        serCartItems((prev)=>{
            prev.map((item)=>
                item.id === id ? {...item, selected : !item.selected}
            
            )
        })
    }

    // 전체 선택/ 해제
    const toggleSelectedAllItems = (selectAll) =>{
        setCartItems((prev)=>{
            prev.map((item)=>({...item, selected : selectAll}))
        });
    };


    return(

        // 부모 컴포넌트인 CartPage에서 cartItems,toggleSelectAll를 props로 전달
        <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* 좌측: 상품 목록 */}
      <div className="flex-1 bg-white rounded shadow p-4">
        {/* CartHeader에 "장바구니 데이터랑 전체선택 버튼 눌렀을 때 실행할 함수"를 넘겨줌 */}
        <CartHeader 
            cartItems={cartItems}
            toggleSelectedAllItems = {toggleSelectedAllItems}/>
        <CartItemList 
            cartItems={cartItems}
            updateOpton={updateOpton}
            updateQuantity={updateQuantity}
            toggleSelectedItems={toggleSelectedItems}
            toggleWishlistItem={toggleWishlistItem}
        />
      </div>

      {/* 우측: 배송 정보 및 결제 금액 */}
      <div className="w-full lg:w-1/3 bg-gray-50 rounded shadow p-4">
        <CouponBox 
            cartItems={cartItems}
        />
        <CartFooter 
            cartItems={cartItems}
        />
      </div>
    </div>
    );

};
export default CartPage;