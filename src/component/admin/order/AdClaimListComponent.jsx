import { useState, useEffect, useCallback } from 'react'
import ReactModal from 'react-modal'
import { getClaimList, patchOrderReturn } from "../../../api/admin/order/ClaimManageApi";
import Pagination from "../product/Pagination"
import AdClaimDetail from './AdClaimDetail'

const AdClaimListComponent = ({ searchFilters, currentPage, onPageChange })=>{
  
    const [claims, setClaims] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedId, setSelectedId] = useState(null);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedClaim, setSelectedClaim] = useState(null);

    const getClaims = useCallback(async () => {

        const claimParams = {
            ...searchFilters,
            page: currentPage,
        };

        try {
            const result = await getClaimList(claimParams);

            console.log(result.claims.content);
            setClaims(result.claims.content);
            setTotalPages(result.totalPage);
            setSelectedId(null);
        } catch (error) {
            console.error('고객 요청 목록 불러오기 실패:', error);
            setClaims([]);
            setTotalPages(1);
        }
    },[searchFilters, currentPage]);
    
    useEffect(() => {        
        getClaims();
    }, [getClaims]);

    const handleUpdateSelected = async (approval) => {
        if (selectedId === null)
            return;

        try{
            console.log("선택ID: " + selectedId);
            console.log("승인여부: " + approval);
            const result = await patchOrderReturn({id: selectedId, approval: approval});
            console.log(result);
        } catch (error){
            console.log('상태변경 실패: ', error)
        } finally{
            await getClaims();
        }
    };
    
    const openModal = (Claim) => {
        console.log(Claim);
        setSelectedClaim(Claim);
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedClaim(null);
    };

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

  return (
    <>
        <div className='flex flex-col ml-10 mr-10 mt-10 relative'>
            <button className="absolute w-20 top-0 left-0 bg-gray-400 text-white rounded"
                onClick={() => handleUpdateSelected("승인")}
                disabled={selectedId === null}>
                승인
            </button>
            <button className="absolute w-20 top-0 left-24 bg-gray-400 text-white rounded"
                onClick={() => handleUpdateSelected("반려")}
                disabled={selectedId === null}>
                반려
            </button>

            <table id="list" className='border border-gray-400 mt-8'>
                <tr className='bg-gray-400'>
                    <th></th>
                    <th>요청ID</th>
                    <th>고객ID</th>
                    <th>주문ID</th>
                    <th>요청유형</th>
                    <th>요청날짜</th>
                </tr>
                {claims.length === 0? (
                    <tr>
                        {/* <td>검색결과가 없습니다.</td> */}
                    </tr>
                ): (
                    claims.map((c) => (
                        <tr key={c.claimId}
                            className='text-center hover:bg-gray-100 cursor-pointer'
                            onClick={() => openModal(c)}
                        >
                            <td>
                                <input
                                    type='checkbox'
                                    checked={selectedId === c.claimId}
                                    onClick={e => e.stopPropagation()}  //모달창 클릭 방지
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setSelectedId(c.claimId);
                                        } else {
                                            setSelectedId(null);
                                        }
                                    }}
                                />
                            </td>    
                            <td>{c.claimId}</td>
                            <td>{c.orderReturn.memberId}</td>
                            <td>{c.orderReturn.orderId}</td>
                            <td>{returnTypeLabels[c.orderReturn.returnType]?? c.orderReturn.returnType}</td>
                            <td>{new Date(c.orderReturn.regDate).toLocaleDateString()}</td>
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
            {selectedClaim && <AdClaimDetail claimManage={selectedClaim} />}
        </ReactModal>
    </>
  );
}
export default AdClaimListComponent;