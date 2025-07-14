import { useState } from 'react'
import AdminLayout from "../../../layouts/AdminLayout";
import AdClaimListComponent from '../../../component/admin/order/AdClaimListComponent'

const AdClaimListPage = ()=>{
    const [filters, setFilters] = useState({
        searchType: '',
        searchContent: '',
        returnType: '',
        startDate: '',
        endDate: '',
    });

    const [currentPage, setCurrentPage] = useState(0);

    const [appliedFilters, setAppliedFilters] = useState(filters);

    const handleSearch = () => {
        console.log(filters)
        setAppliedFilters(filters);
        setCurrentPage(0); // 첫 페이지로 초기화
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    
    return (
        <AdminLayout>
            <div className="space-y-2 ml-10 mt-10">
                {/* 주문ID, 고객ID, 요청유형, 요청일자(regtime) */}
                검색유형:
                <select value={filters.searchType} onChange={(e)=>setFilters({...filters, searchType: e.target.value})} className="border ml-2 p-1">
                    <option value="주문 ID">주문 ID</option>
                    <option value="고객 ID">고객 ID</option>
                </select>
                <input type="text" value={filters.searchContent} onChange={(e)=>setFilters({ ...filters, searchContent: e.target.value })} className="border ml-2 p-1"/>
                고객 요청 유형:
                <select value={filters.returnType} onChange={(e)=>setFilters({...filters, returnType: e.target.value})} className="border ml-2 p-1">
                    <option value="CANCEL_REQUEST">취소신청</option>
                    <option value="CANCEL_COMPLETE">취소완료</option>
                    <option value="CANCEL_REJECTED">취소반려</option>
                    <option value="RETURN_REQUEST">반품신청</option>
                    <option value="RETURN_COMPLETE">반품완료</option>
                    <option value="RETURN_REJECTED">반품반려</option>
                    <option value="EXCHANGE_REQUEST">교환신청</option>
                    <option value="EXCHANGE_COMPLETE">교환완료</option>
                    <option value="EXCHANGE_REJECTED">교환반려</option>
                </select>
                요청일자:
                <input type="date" value={filters.startDate} onChange={(e)=>setFilters({ ...filters, startDate: e.target.value })} className="border ml-2 p-1"/>
                <input type="date" value={filters.endDate} onChange={(e)=>setFilters({ ...filters, endDate: e.target.value })} className="border ml-2 p-1"/>
            </div>
            <button className="bg-blue-500 text-white px-4 py-1 ml-10 rounded" onClick={handleSearch}>검색</button>

            <AdClaimListComponent
                searchFilters={appliedFilters}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </AdminLayout>
    );
}
export default AdClaimListPage;