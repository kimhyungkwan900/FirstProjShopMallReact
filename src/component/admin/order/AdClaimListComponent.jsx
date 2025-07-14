import { useState, useEffect, useCallback } from 'react'
import ReactModal from 'react-modal'
import { getClaimList } from "../../../api/admin/order/ClaimManageApi";
import Pagination from "../product/Pagination"
import AdClaimDetail from './AdClaimDetail'

const AdClaimListComponent = ({ searchFilters, currentPage, onPageChange })=>{
  
    const [claims, setClaims] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);

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
            setSelectedIds([]);
        } catch (error) {
            console.error('고객 요청 목록 불러오기 실패:', error);
            setClaims([]);
            setTotalPages(1);
        }
    },[searchFilters, currentPage]);
    
        useEffect(() => {        
            getClaims();
        }, [getClaims]);
    
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
        
        const openModal = (Claim) => {
            console.log(Claim);
            setSelectedClaim(Claim);
            setModalIsOpen(true);
        };
        const closeModal = () => {
            setModalIsOpen(false);
            setSelectedClaim(null);
        };
  
  return (
    <>
        <div className='flex flex-col ml-10 mr-10 mt-10 relative'>
            <button className="absolute top-0 left-0 bg-gray-400 text-white rounded"
            // onClick={}
            disabled={selectedIds.length === 0}>
                선택 삭제
            </button>
            <table id="list" className='border border-gray-400 mt-8'>
                <tr className='bg-gray-400'>
                    <th>.</th>
                    <th>.</th>
                    <th>.</th>
                    <th>.</th>
                    <th>.</th>
                    <th>.</th>
                    <th>.</th>
                </tr>
                {claims.length === 0? (
                    <tr>
                        {/* <td>검색결과가 없습니다.</td> */}
                    </tr>
                ): (
                    claims.map((c) => (
                        <tr key={c.claimManageId}
                            className='text-center hover:bg-gray-100 cursor-pointer'
                            onClick={() => openModal(c)}
                        >
                            <td>
                                <input
                                    type='checkbox'
                                    checked={selectedIds.includes()}
                                    onClick={e => e.stopPropagation()}  //모달창 클릭 방지
                                    // onChange={() => toggleSelect(p.id)}
                                />
                            </td>    
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
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