import { useState, useEffect, useCallback } from 'react'
import { getProductList } from "../../../api/admin/product/ProductManageApi";
import { deleteProduct } from '../../../api/admin/product/ProductManageApi';
import Pagination from "./Pagination"


const AdProductListComponent = ({ searchFilters, currentPage, onPageChange })=>{
    
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);

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

        console.log(selectedIds);
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0)
            return;

        try{
            await deleteProduct(selectedIds);
        } catch (error){
            console.log('상품삭제 실패: ', error)
        } finally{
            await getProducts();
        }
    };

    return(
        <>
        <div className='flex flex-col ml-10 mr-10 mt-10 relative'>
            <button className="absolute top-0 left-0 bg-gray-400 text-white rounded" onClick={handleDeleteSelected}>
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
                        <td>검색결과가 없습니다.</td>
                    </tr>
                ): (
                    products.map((p) => (
                        <tr key={p.id} className='text-center'>
                            <td>
                                <input
                                    type='checkbox'
                                    checked={selectedIds.includes(p.id)}
                                    onChange={() => toggleSelect(p.id)}
                                />
                            </td>    
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price.toLocaleString()}</td>
                            <td>{p.stock}개</td>
                            <td>{p.viewCount}</td>
                            <td>{p.sellStatus}</td>
                            <td>{p.brand.name}</td>
                            <td>{p.category.name}</td>
                            <td>{new Date(p.createTime).toLocaleString()}</td>
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
        </>
    );
}
export default AdProductListComponent;