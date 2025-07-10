import { useState, useEffect } from 'react'
import { getProductList } from "../../../api/admin/product/ProductManageApi";


const AdProductListComponent = ({ searchFilters, currentPage, onPageChange })=>{
    
    const [product, setProduct] = useState([]);
    
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

        const getProducts = async () => {

            const productParams = {
                ...searchFilters,
                currentPage,
            };

            try {
                const result = await getProductList(productParams);

                const { products, productSearchDto, maxPage, totalPages } = result;
                const productList = products.content;

                // console.log(productSearchDto);
                // console.log(products.number);

                // console.log("최대 페이지 표시 수:", maxPage);

                setProduct(productList);
                setTotalPages(totalPages);
            } catch (error) {
                console.error('상품 목록 불러오기 실패:', error);
            }
        };

        getProducts();

    }, [searchFilters, currentPage]);

    return(
        <div>
            {product.length === 0? (
                <p>검색결과가 없습니다.</p>
            ): (
                <ul>
                    {product.map((p) => (
                        <li key={p.id}>
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
            {/* 페이징 UI */}
            <div style={{ marginTop: '1rem' }}>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={page === currentPage}
                    style={{
                    margin: '0 4px',
                    fontWeight: page === currentPage ? 'bold' : 'normal',
                    }}
                >
                    {page}
                </button>
                ))}
            </div>
        </div>
        
    );
}
export default AdProductListComponent;