const AdClaimDetail = ({claimManage})=>{

    const returnTypeLabels = {
            CANCEL_REQUEST:   '취소 신청',
            CANCEL_COMPLETE:  '취소 완료',
            CANCEL_REJECTED:  '취소 반려',
            RETURN_REQUEST:   '반품 신청',
            RETURN_COMPLETE:  '반품 완료',
            RETURN_REJECTED:  '반품 반려',
            EXCHANGE_REQUEST: '교환 신청',
            EXCHANGE_COMPLETE:'교환 완료',
            EXCHANGE_REJECTED:'교환 반려',
    };

    return(
        <ul className="p-10 ">
            <li className="mb-2">
                <p className="font-bold">요청ID:</p> {claimManage.orderReturn.id}
            </li>
            <li className="mb-2">
                <p className="font-bold">고객ID:</p>: {claimManage.orderReturn.memberId}
            </li>
            <li className="mb-2">
                <p className="font-bold">주문ID:</p> {claimManage.orderReturn.orderId}
            </li>
            <li className="mb-2">
                <p className="font-bold">요청유형:</p> {returnTypeLabels[claimManage.orderReturn.returnType]?? claimManage.orderReturn.returnType}
            </li>
            <li className="mb-2">
                <p className="font-bold">요청내용:</p> {claimManage.orderReturn.reason}
            </li>
            <li className="mb-2">
                <p className="font-bold">요청내용 상세:</p> {claimManage.orderReturn.detail}
            </li>
        </ul>
    );
}
export default AdClaimDetail;