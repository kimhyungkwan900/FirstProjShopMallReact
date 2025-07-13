import { useState, useEffect, useCallback } from 'react'
import { getOrderList } from "../../../api/admin/order/OrderManageApi";
// import { patchStatus } from "../../../api/admin/order/OrderManageApi";
import Pagination from "../product/Pagination"

const AdOrderListComponent = ({ searchFilters, currentPage, onPageChange })=>{
   
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);

    const getOrders = useCallback(async () => {

        const orderParams = {
            ...searchFilters,
            isApproved: true,
            page: currentPage,
        };

        try {
            const result = await getOrderList(orderParams);

            setOrders(result.orders.content);
            setTotalPages(result.totalPage);
            setSelectedIds([]);
        } catch (error) {
            console.error('주문 목록 불러오기 실패:', error);
            setOrders([]);
            setTotalPages(1);
        }
    },[searchFilters, currentPage]);

    useEffect(() => {        
        getOrders();
    }, [getOrders]);

    // const toggleSelect = (id) => {
    //     setSelectedIds(prev =>
    //         prev.includes(id)? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    //     );
    //     console.log(selectedIds);
    // };

    // const handleUpdateSelected = async () => {
    //     if (selectedIds.length === 0)
    //         return;

    //     try{
    //         const result = await patchStatus(selectedIds);
    //         console.log(result);
    //     } catch (error){
    //         console.log('상품삭제 실패: ', error)
    //     } finally{
    //         await getProducts();
    //     }
    // };

    return (
        <div className='flex flex-col ml-10 mr-10 mt-10 relative'>
            <button className="absolute top-0 left-0 bg-gray-400 text-white rounded"
            // onClick={}
            disabled={selectedIds.length === 0}>
                선택 삭제
            </button>
            <table id="list" className='border border-gray-400 mt-8'>
                <tr className='bg-gray-400'>
                    <th></th>
                    <th>주문ID</th>
                    <th>주문자ID</th>
                    <th>주문상태</th>
                    <th>주문날짜</th>
                    <th>주문가격</th>
                    <th>결제방식</th>
                </tr>
                {orders.length === 0? (
                    <tr>
                        {/* <td>검색결과가 없습니다.</td> */}
                    </tr>
                ): (
                    orders.map((o) => (
                        <tr key={o.orderManageId} className='text-center hover:bg-gray-100 cursor-pointer'>
                            <td>
                                <input
                                    type='checkbox'
                                    checked={selectedIds.includes(o.order.id)}
                                    // onChange={() => toggleSelect(p.id)}
                                />
                            </td>    
                            <td>{o.order.id}</td>
                            <td>{o.order.member_id}</td>
                            <td>{o.orderStatus}</td>
                            <td>{new Date(o.order.order_date).toLocaleDateString()}</td>
                            <td>{o.total_amount.toLocaleString()}</td>
                            <td>{o.order.payment_method}</td>
                        </tr>
                    ))
                )}
            </table>
            {/* 페이징 */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
}
export default AdOrderListComponent;