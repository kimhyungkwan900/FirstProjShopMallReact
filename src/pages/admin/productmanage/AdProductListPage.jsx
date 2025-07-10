import { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import AdProductListComponent from "../../../component/admin/product/AdProductListComponent";
import Pagination from "../../../component/admin/product/Pagination";

const AdProductListPage = ()=>{

    const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(0);
  
    // const [totalCount, setTotalCount] = useState(0);
    // const pageSize = 5;

    const [filters, setFilters] = useState({
        productId: '',
        productName: '',
        brandName: '',
        sellStatus: '',
        categoryId: '',
        dateType: '',
        startDate: '',
        endDate: '',
    });

    const [appliedFilters, setAppliedFilters] = useState(filters);

    const handleSearch = () => {
        setAppliedFilters(filters);
        setCurrentPage(1); // 첫 페이지로 초기화
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return(
        <AdminLayout>
            <div className="text-1xl">
                검색조건 입력<br/>
                상품번호: <input type="text" value={filters.productId} onChange={(e)=>setFilters({ ...filters, productId: e.target.value })} className="border"/><br/>
                상품명: <input type="text" value={filters.productName} onChange={(e)=>setFilters({ ...filters, productName: e.target.value })} className="border"/><br/>
                브랜드명: <input type="text" value={filters.brandName} onChange={(e)=>setFilters({...filters, brandName: e.target.value })} className="border"/><br/>
                판매상태:
                <select value={filters.sellStatus} onChange={(e)=>setFilters({...filters, sellStatus: e.target.value })}  className="border">
                    <option value="판매중">판매중</option>
                    <option value="품절">품절</option>
                </select>
                카테고리:
                {/* #region 카테고리 select */}
                <select value={filters.categoryId} onChange={(e)=>setFilters({...filters, categoryId: e.target.value })}  className="border">
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
                <select value={filters.dateType} onChange={(e)=>setFilters({...filters, dateType: e.target.value })} className="border">
                    <option value="등록일">등록일</option>
                    <option value="수정일">수정일</option>
                </select>
                <input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} className="border"/>
                <input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} className="border"/>
            </div>
            <button className="border" onClick={handleSearch}>검색</button>

            <AdProductListComponent
                searchFilters={appliedFilters}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </AdminLayout>
    );
}
export default AdProductListPage;