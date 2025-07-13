import { useMemo, useState } from "react";
import { patchProduct } from "../../../api/admin/product/ProductManageApi"

const AdProductDetail = ({product})=>{

    const initState = {
        name: `${product.name}`,
        description: `${product.description}`,
        price: `${product.price}`,
        stock: `${product.stock}`,
        categoryId: `${product.category.id}`,
        brandId: `${product.brand.id}`,
        deliveryInfoId: `${product.deliveryInfo.id}`,
        sellStatus: `${product.sellStatus}`,
    }

    const [productEdit, setProductEdit] = useState({...initState})
    const [files, setFiles] = useState([]); 

    const isFormValid = useMemo(()=>{

        const hasEmptyField = Object.values(productEdit).some(val => val === "" || val == null);

        const hasNoFiles = files.length === 0;

        return !hasEmptyField && !hasNoFiles; 
    }, [productEdit, files]);

    const handleChangeProduct = (e) => {
        productEdit[e.target.name] = e.target.value

        setProductEdit({...productEdit})
    }

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    // const handleFileChange = (e) => {
    //     setFiles(e.target.files);
    // };

    const handleClickAdd = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        console.log("product")
        console.log(productEdit);   //나중에 제거

        for(const key in productEdit){
            formData.append(key, productEdit[key]);
        }

        for (let i = 0; i < files.length; i++) {
            formData.append("productImgFile", files[i]);
        }

        try {
            const result = await patchProduct(formData);
                console.log("result: ")
                console.log(result);
                // window.location.reload();
            } catch (e) {
            console.error(e);
        }
    }
    
    return(
        <div className="">
            {/* "border-2 border-sky-200 mt-10 m-2 p-4" */}
            {/* 상품명 */}
            <div className="flex justify-center">
                <div className="relative mb-4 mr-10 mt-10 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-1 text-right font-bold">상품이름</div>
                    <input className="w-4/5 p-1 rounded-r border border-solid border-neutral-500 shadow-md" 
                        name="name"
                        type={'text'} 
                        value={product.name}
                        onChange={handleChangeProduct}
                    />
                </div>
            </div>

            {/* 가격 */}
            <div className="flex justify-center">
                <div className="relative mb-4 mr-10 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-1 text-right font-bold">가격</div>
                <input className="w-4/5 p-1 rounded-r border border-solid border-neutral-500 shadow-md" 
                name="price"
                type={'text'} 
                value={product.price}
                onChange={handleChangeProduct}
                >
                </input>
                </div>  
            </div>

            {/* 설명 */}
            <div className="flex justify-center">
                <div className="relative mb-4 mr-10 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-5 text-right font-bold">상품 설명</div>
                <input className="w-4/5 p-5 rounded-r border border-solid border-neutral-500 shadow-md" 
                name="description"
                type={'text'} 
                value={product.description}
                onChange={handleChangeProduct}
                >
                </input>
                </div>  
            </div>

            {/* 재고 */}
            <div className="flex justify-center">
                <div className="relative mb-4 mr-10 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-1 text-right font-bold">재고</div>
                <input className="w-4/5 p-1 rounded-r border border-solid border-neutral-500 shadow-md" 
                name="stock"
                type={'text'} 
                value={product.stock}
                onChange={handleChangeProduct}
                >
                </input>
                </div>  
            </div>

            {/* 카테고리 */}
            <div className="flex justify-center">
                <div className="relative mb-4 mr-10 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-1 text-right font-bold">카테고리</div>
                {/* #region 카테고리 select */}
                <select className="w-4/5 p-1 rounded-r border border-solid border-neutral-500 shadow-md" 
                name="categoryId"
                type={'text'} 
                value={product.categoryId}
                onChange={handleChangeProduct}
                >
                    <option value="1">패션의류/잡화</option>
                    <option value="2">여성의류</option>
                    <option value="3">원피스</option>
                    <option value="4">블라우스</option>
                    <option value="5">니트/스웨터</option>
                    <option value="6">트렌치코트</option>
                    <option value="7">남성의류</option>
                    <option value="8">티셔츠</option>
                    <option value="9">맨투맨</option>
                    <option value="10">셔츠</option>
                    <option value="11">청바지</option>
                    <option value="12">패션잡화</option>
                    <option value="13">가방</option>
                    <option value="14">지갑</option>
                    <option value="15">모자</option>
                    <option value="16">디지털/가전</option>
                    <option value="17">노트북/태블릿</option>
                    <option value="18">스마트폰</option>
                    <option value="19">이어폰/헤드폰</option>
                    <option value="20">모니터</option>
                    <option value="21">스마트워치</option>
                    <option value="22">뷰티/미용</option>
                    <option value="23">스킨케어</option>
                    <option value="24">메이크업</option>
                    <option value="25">향수</option>
                    <option value="26">바디케어</option>
                    <option value="27">식품/건강</option>
                    <option value="28">신선식품</option>
                    <option value="29">과일</option>
                    <option value="30">채소</option>
                    <option value="31">정육/계란</option>
                    <option value="32">가공식품</option>
                    <option value="33">간편식</option>
                    <option value="34">라면/면류</option>
                    <option value="35">과자/간식</option>
                    <option value="36">건강기능식품</option>
                    <option value="37">생활/주방</option>
                    <option value="38">청소용품</option>
                    <option value="39">주방용품</option>
                    <option value="40">욕실용품</option>
                    <option value="41">수납/정리</option>
                    <option value="42">유아동</option>
                    <option value="43">유아의류</option>
                    <option value="44">유아식품</option>
                    <option value="45">장난감/완구</option>
                    <option value="46">유모차/카시트</option>
                </select>
                {/* #endregion */}
                </div>  
            </div>

            {/* 브랜드 */}
            <div className="flex justify-center">
                <div className="relative mb-4 mr-10 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-1 text-right font-bold">브랜드</div>
                {/* #region 브랜드 select */}
                <select className="w-4/5 p-1 rounded-r border border-solid border-neutral-500 shadow-md" 
                name="brandId"
                type={'text'} 
                value={product.brandId}
                onChange={handleChangeProduct}
                >
                    <option value="">전체</option>
                    <option value="1">아라사카</option>
                    <option value="2">밀리테크</option>
                    <option value="3">캉 타오</option>
                    <option value="4">미드나이트</option>
                    <option value="5">말로리안</option>
                    <option value="6">테크트로니카</option>
                    <option value="7">컨스티튜셔널</option>
                    <option value="8">로스토빅</option>
                    <option value="9">켄다치</option>
                    <option value="10">미니스트릿</option>
                    <option value="11">노블리안</option>
                    <option value="12">더빈티지</option>
                    <option value="13">나이트코프</option>
                    <option value="14">어반나이트</option>
                    <option value="15">웰메이드</option>
                    <option value="16">바이오테크니카</option>
                    <option value="17">네오패션</option>
                    <option value="18">브루클린웨어</option>
                    <option value="19">트렌디코어</option>
                    <option value="20">콘페키</option>
                </select>
                {/* #endregion */}
                </div>  
            </div>

            {/* 배송방법 */}
            <div className="flex justify-center">
                <div className="relative mb-4 mr-10 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-1 text-right font-bold">배송방법</div>
                <select className="w-4/5 p-1 rounded-r border border-solid border-neutral-500 shadow-md" 
                name="deliveryInfoId"
                type={'text'} 
                value={product.deliveryInfoId}
                onChange={handleChangeProduct}
                >
                    <option value="1">CJ</option>
                    <option value="2">로젠</option>
                    <option value="3">롯데</option>
                    <option value="4">없음</option>
                </select>
                </div>
            </div>

            {/* 판매상태 */}
            <div className="flex justify-center">
                <div className="relative mb-4 mr-10 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-1 text-right font-bold">판매상태</div>
                <select className="w-4/5 p-1 rounded-r border border-solid border-neutral-500 shadow-md" 
                name="sellStatus"
                type={'text'} 
                value={product.sellStatus}
                onChange={handleChangeProduct}
                >
                    <option value="판매중">판매중</option>
                    <option value="품절">품절</option>
                </select>
                </div>
            </div>

            {/* 이미지 파일 */}
            <div className="flex justify-center">
                <div className="relative mb-4 mr-10 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-1 text-right font-bold">상품 이미지</div>
                <input className="w-4/5 p-1 rounded-r border border-solid border-neutral-500 shadow-md" 
                name="productImgFile"
                type={'file'} 
                multiple
                onChange={handleFileChange}
                >
                </input>
                </div>
            </div>
            
            {/* 유효성 안내 문구 */}
            {!isFormValid && (
                <div className="text-red-600 text-sm mb-2">
                모든 필드를 입력하고 최소 1개의 이미지를 선택해주세요.
                </div>
            )}

            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button" 
                        className={`rounded p-2 w-18 text-white ${
                            isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        onClick={handleClickAdd}
                        disabled={!isFormValid}
                    >
                    수정
                </button>
                </div>
            </div>
        </div>
    );
}
export default AdProductDetail;