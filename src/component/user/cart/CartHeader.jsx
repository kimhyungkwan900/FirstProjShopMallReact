//전체 선택하는 부분

const CartHeader = ({cartItems, toggleSelectAll}) =>{
    const allSelected = cartItems.length > 0 && cartItems.every((item)=>item.selected);

    return(
        <div className="flex justify-between items-center border-b pb-2 mb-2">
            <div className="flex items-center gap-2">
                <input type="checkbox" checked = {allSelected}
                onChange={(e)=>toggleSelectAll(e.target.checked)}/>
                <span> 전체 선택 </span>
            </div>
        </div>
    );
};

export default CartHeader;