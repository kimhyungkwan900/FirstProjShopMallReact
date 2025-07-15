import { useState } from 'react'
import AdminLayout from "../../../layouts/AdminLayout";
import AdOrderListComponent from '../../../component/admin/order/AdOrderListComponent'

const AdOrderListPage = ()=>{

    const [filters, setFilters] = useState({
        searchType: '',
        searchContent: '',
        orderStatus: '',
        startDate: '',
        endDate: '',
    });

    const [currentPage, setCurrentPage] = useState(0);

    const [appliedFilters, setAppliedFilters] = useState(filters);

    const handleSearch = () => {
        setAppliedFilters(filters);
        setCurrentPage(0); // 첫 페이지로 초기화
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

  return(
    <AdminLayout>
        <div className="space-y-2 ml-10 mt-10">
            {/* 주문ID, 주문자ID, 주문 상태, 주문일자(regtime) */}
            검색유형:
            <select value={filters.searchType} onChange={(e)=>setFilters({...filters, searchType: e.target.value})} className="border ml-2 p-1">
                <option value="주문 ID">주문 ID</option>
                <option value="고객 ID">고객 ID</option>
            </select>
            <input type="text" value={filters.searchContent} onChange={(e)=>setFilters({ ...filters, searchContent: e.target.value })} className="border ml-2 p-1"/>
            주문 상태:
            <select value={filters.orderStatus} onChange={(e)=>setFilters({...filters, orderStatus: e.target.value})} className="border ml-2 p-1">
                <option value="접수">접수</option>
                <option value="확인">확인</option>
                <option value="배송중">배송중</option>
                <option value="배송완료">배송완료</option>
            </select>
            주문일자:
            <input type="date" value={filters.startDate} onChange={(e)=>setFilters({ ...filters, startDate: e.target.value })} className="border ml-2 p-1"/>
            <input type="date" value={filters.endDate} onChange={(e)=>setFilters({ ...filters, endDate: e.target.value })} className="border ml-2 p-1"/>
        </div>
        <button className="bg-blue-500 text-white px-4 py-1 ml-10 rounded" onClick={handleSearch}>검색</button>
        
        <AdOrderListComponent
            searchFilters={appliedFilters}
            currentPage={currentPage}
            onPageChange={handlePageChange}
        />
    </AdminLayout>
  );
}
export default AdOrderListPage;