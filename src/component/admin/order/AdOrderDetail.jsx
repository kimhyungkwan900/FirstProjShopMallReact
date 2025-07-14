const AdOrderDetail = ({orderManage})=>{
    return(
        <ul className="p-10 ">
            <li className="mb-2">
                <p className="font-bold">주문ID:</p> {orderManage.order.id}
            </li>
            <li className="mb-2">
                <p className="font-bold">주문자ID:</p>: {orderManage.order.member_id}
            </li>
            <li className="mb-2">
                <p className="font-bold">배송지:</p> {orderManage.order.delivery_address}
            </li>
            <li className="mb-2">
                <p className="font-bold">배송 요청사항:</p> {orderManage.order.delivery_request}
            </li>
            <li className="mb-2">
                <p className="font-bold">주문일자:</p> {new Date(orderManage.order.order_date).toLocaleDateString()}
            </li>
            <li className="mb-2">
                <p className="font-bold">결제방식:</p> {orderManage.order.payment_method}
            </li>
            <li className="mb-2">
                <p className="font-bold">주문금액:</p> {orderManage.order.total_amount}
            </li>
            <li className="mb-2">
                <p className="font-bold">주문상태:</p> {orderManage.orderStatus}
            </li>
        </ul>
    );
}
export default AdOrderDetail;