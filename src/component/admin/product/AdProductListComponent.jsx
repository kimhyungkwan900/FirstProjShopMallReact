import { useState, useEffect, useCallback } from 'react'
import ReactModal from 'react-modal'
import { getProductList } from "../../../api/admin/product/ProductManageApi";
import { deleteProduct } from '../../../api/admin/product/ProductManageApi';
import { useCsrfToken } from "../../../hooks/common/useCsrfToken";
import Pagination from "./Pagination"
import AdProductUpdate from './AdProductUpdate';

const AdProductListComponent = ({ searchFilters, currentPage, onPageChange })=>{
    const csrfToken = useCsrfToken();

    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const getProducts = useCallback(async () => {

        const productParams = {
            ...searchFilters,
            page: currentPage,
        };

        try {
            const result = await getProductList(productParams);

            setProducts(result.products.content);
            setTotalPages(result.totalPage);
            setSelectedIds([]);
        } catch (error) {
            console.error('상품 목록 불러오기 실패:', error);
            setProducts([]);
            setTotalPages(1);
        }
    },[searchFilters, currentPage]);

    useEffect(() => {        
        getProducts();
    }, [getProducts]);

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id)? prev.filter(selectedId => selectedId !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0)
            return;

        try{
            await deleteProduct(selectedIds, csrfToken);
        } catch (error){
            console.log('상품삭제 실패: ', error)
        } finally{
            await getProducts();
        }
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedProduct(null);
    };

    return(
        <>
            <div className='flex flex-col ml-10 mr-10 mt-10 relative'>
                <button className="absolute top-0 left-0 bg-gray-400 text-white rounded"
                onClick={handleDeleteSelected} disabled={selectedIds.length === 0}>
                    선택 삭제
                </button>
                <table id="list" className='border border-gray-400 mt-8'>
                    <tr className='bg-gray-400'>
                        <th></th>
                        <th>상품ID</th>
                        <th>상품이름</th>
                        <th>가격</th>
                        <th>재고</th>
                        <th>상태</th>
                        <th>카테고리</th>
                        <th>브랜드</th>
                        <th>조회수</th>
                        <th>등록일</th>
                    </tr>
                    {products.length === 0? (
                        <tr>
                            {/* <td>검색결과가 없습니다.</td> */}
                        </tr>
                    ): (
                        products.map((p) => (
                            <tr key={p.id} 
                                className='text-center hover:bg-gray-100 cursor-pointer'
                                onClick={() => openModal(p)}
                            >
                                <td>
                                    <input
                                        type='checkbox'
                                        checked={selectedIds.includes(p.id)}
                                        onClick={e => e.stopPropagation()}  //모달창 클릭 방지
                                        onChange={() => toggleSelect(p.id)}
                                    />
                                </td>    
                                <td>{p.id}</td>
                                <td>{p.name}</td>
                                <td>{p.price.toLocaleString()}</td>
                                <td>{p.stock}</td>
                                <td>{p.sellStatus}</td>
                                <td>{p.category.name}</td>
                                <td>{p.brand.name}</td>
                                <td>{p.viewCount}</td>
                                <td>{new Date(p.regTime).toLocaleDateString()}</td>
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
            {/*  */}
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
                {selectedProduct && <AdProductUpdate product={selectedProduct} />}
            </ReactModal>
        </>
    );
}
export default AdProductListComponent;