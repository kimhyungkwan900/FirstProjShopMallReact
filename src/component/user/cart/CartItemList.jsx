//상품 데이터를 CartItem에 전달

import React from 'react';
import CartItem from './CartItem';

const CartItemList = ({
    cartItems, updateOption, updateQuantity, deleteItem,toggleSelectedItems, toggleWishlistITem

}) =>{
    if(cartItems.length === 0){
        <div className="items-center">
            <p className='text-center'>장바구니가 비어 있습니다</p>
            <button><a link = "/login" ></a>로그인하러 가기</button>
        </div>

    }


    return(
        <div className='space-y-4'>
            {cartItems.map((item) =>(
                <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    updateOption={updateOption}
                    deleteItem={deleteItem}
                    toggleSelectItem={toggleSelectedItems}
                    toggleWishlistITem={toggleWishlistITem}
                />
            ))}
        </div>
    );

}

export default CartItemList ;