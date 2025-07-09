import { useState, useEffect } from 'react'
import { getProductList } from "../../../api/admin/product/ProductManageApi";

const AdProductListComponent = ({ searchFilters, page, size, changeTotalPages })=>{
    
    const [product, setProduct] = useState([]);
    
    useEffect(() => {
        const getProducts = async () => {

            const productParams = {
                ...searchFilters,
                page,
                size,
            };

            try {
                const result = await getProductList(productParams);

                const { products, productSearchDto, maxPage } = result;
                const productList = products.content;
                console.log(productSearchDto);
                console.log(products.number);

                console.log("최대 페이지 표시 수:", maxPage);

                setProduct(productList);
                changeTotalPages(products.totalPages);

            } catch (error) {
                console.error('상품 목록 불러오기 실패:', error);
            }
        };

        getProducts();
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