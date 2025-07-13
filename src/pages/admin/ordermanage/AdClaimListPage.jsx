// import { useState } from 'react'
import AdminLayout from "../../../layouts/AdminLayout";
import AdClaimListComponent from '../../../component/admin/order/AdClaimListComponent'

const AdClaimListPage = ()=>{
  return (
    <AdminLayout>
        <div className="text-3xl">
            고객요청 확인 페이지
        </div>
        <AdClaimListComponent/>
    </AdminLayout>
  );
}
export default AdClaimListPage;