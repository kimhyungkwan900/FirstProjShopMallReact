import { useState, useEffect } from 'react'
import { getProductList } from "../../../api/admin/product/ProductManageApi";
import Pagination from "./Pagination"


const AdProductListComponent = ({ searchFilters, currentPage, onPageChange })=>{
    
    const [products, setProducts] = useState([]);
    
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

        const getProducts = async () => {

            const productParams = {
                ...searchFilters,
                page: currentPage,
            };

            try {
                const result = await getProductList(productParams);

                setProducts(result.products.content);
                setTotalPages(result.totalPage)
            } catch (error) {
                console.error('상품 목록 불러오기 실패:', error);
                setProducts([]);
                setTotalPages(1);
            }
        };
        getProducts();
    }, [searchFilters, currentPage]);

    return(
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
            {products.length === 0? (
                <p>검색결과가 없습니다.</p>
            ): (
                <ul className="">
                    {products.map((p) => (
                        <li key={p.id} className="border">
                            상품ID: {p.id},
                            상품이름: {p.name},
                            가격: {p.price.toLocaleString()}원,
                            재고: {p.stock}개,
                            조회수: {p.viewCount},
                            상태: {p.sellStatus},
                            브랜드: {p.brand.name},
                            카테고리: {p.category.name},
                            등록일: {new Date(p.createTime).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}
            
            {/* 페이징 */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
}
export default AdProductListComponent;