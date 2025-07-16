import AdProductRegComponent from "../../../component/admin/product/AdProductRegComponent";
import AdminLayout from "../../../layouts/AdminLayout";

const AdProductRegPage = ()=>{
    return(
        <AdminLayout>
            <div className="text-3xl font-bold mt-5 ml-5">
                상품 등록 페이지
            </div>
            <AdProductRegComponent/>
        </AdminLayout>
    );
}
export default AdProductRegPage;