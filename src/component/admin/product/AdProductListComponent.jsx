import { useState, useEffect } from 'react'
import { getProductList } from "../../../api/admin/product/ProductManageApi";

const AdProductListComponent = ({ searchFilters, page, size })=>{
    
    const [product, setProduct] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {

            const productParams = {
                ...searchFilters,
                page,
                size,
            };

            try {
                const result = await getProductList(productParams);

                const { products, productSearchDto, maxPage } = result;
                const productList = products.content;

                console.log("상품 목록:", productList);
                console.log("전체 페이지 수:", products.totalPages);
                console.log("검색 조건:", productSearchDto);
                console.log("최대 페이지 표시 수:", maxPage);

                setProduct(productList);

            } catch (error) {
                console.error('상품 목록 불러오기 실패:', error);
            }
        };

        fetchProducts();
    }, [searchFilters, page, size]);

    return(
        <ul>
            {product.map((item) => (
                <li key={item.id}>
                    상품ID: {item.id},
                    상품이름: {item.name},
                    가격: {item.price.toLocaleString()}원,
                    재고: {item.stock}개,
                    조회수: {item.viewCount},
                    상태: {item.sellStatus},
                    브랜드: {item.brand.name},
                    카테고리: {item.category.name},
                    등록일: {new Date(item.createTime).toLocaleString()}
                </li>
            ))}
        </ul>
    );
}
export default AdProductListComponent;