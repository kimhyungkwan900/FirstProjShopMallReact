import { useState, useEffect, useCallback } from 'react'
import ReactModal from 'react-modal'
import { getOrderList, patchStatus } from "../../../api/admin/order/OrderManageApi";
import Pagination from "../product/Pagination"
import AdOrderDetail from './AdOrderDetail'

const AdOrderListComponent = ({ searchFilters, currentPage, onPageChange })=>{
   
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const getOrders = useCallback(async () => {

        const orderParams = {
            ...searchFilters,
            page: currentPage,
        };

        try {
            const result = await getOrderList(orderParams);

            console.log("주문 리스트:")
            console.log(result.orders.content);

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

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)? prev.filter(selectedId => selectedId !== id) : [...prev, id]
        );
        console.log(selectedIds);
    };

    const handleUpdateSelected = async (newStatus) => {
        if (selectedIds.length === 0)
            return;

        try{
            const result = await patchStatus({ids: selectedIds, newStatus: newStatus});
            console.log("patch결과: " + result);
        } catch (error){
            console.log('상태수정 실패: ', error)
        } finally{
            await getOrders();
        }
    };
    
    const openModal = (order) => {
        console.log(order);
        setSelectedOrder(order);
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedOrder(null);
    };

    return (
        <>
            <div className='flex flex-col ml-10 mr-10 mt-10 relative'>
                <button className="absolute w-20 top-0 left-0 bg-gray-400 text-white rounded"
                    onClick={() => handleUpdateSelected("확인")}
                    disabled={selectedIds.length === 0}>
                    확인
                </button>
                <button className="absolute w-20 top-0 left-24 bg-gray-400 text-white rounded"
                    onClick={() => handleUpdateSelected("배송중")}
                    disabled={selectedIds.length === 0}>
                    배송중
                </button>
                <button className="absolute w-20 top-0 left-48 bg-gray-400 text-white rounded"
                    onClick={() => handleUpdateSelected("배송완료")}
                    disabled={selectedIds.length === 0}>
                    배송완료
                </button>

                <table id="list" className='border border-gray-400 mt-8'>
                    <tr className='bg-gray-400'>
                        <th></th>
                        <th>주문ID</th>
                        <th>고객ID</th>
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
                            <tr key={o.orderManageId}
                                className='text-center hover:bg-gray-100 cursor-pointer'
                                onClick={() => openModal(o)}
                            >
                                <td>
                                    <input
                                        type='checkbox'
                                        checked={selectedIds.includes(o.orderManageId)}
                                        onClick={e => e.stopPropagation()}  //모달창 클릭 방지
                                        onChange={() => toggleSelect(o.orderManageId)}
                                    />
                                </td>    
                                <td>{o.order.id}</td>
                                <td>{o.order.member_id}</td>
                                <td>{o.orderStatus}</td>
                                <td>{new Date(o.order.order_date).toLocaleDateString()}</td>
                                <td>{o.order.total_amount}</td>
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
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="fixed inset-0 bg-black bg-transparent flex justify-center items-center"
                className="relative bg-white w-9/20 border rounded-lg overflow-auto mx-auto"
            
                 style={{
                    content: {
                        top:    '1%',
                        left:   '1%',
                        right:  '1%',
                    }
                }}
                >
                <button
                    className="absolute top-1 right-1 text-5xl text-gray-600 hover:text-gray-900"
                    onClick={closeModal}
                >
                ×
                </button>
                {selectedOrder && <AdOrderDetail orderManage={selectedOrder} />}
            </ReactModal>
        </>
    );
}
export default AdOrderListComponent;