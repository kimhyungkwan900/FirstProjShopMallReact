import { Suspense, lazy } from "react";
import AdminRoute from "../AdminRoute";

const role = localStorage.getItem("role");

const Loading = <div>Loading...</div>
const AdProductListPage = lazy(() => import("../../../pages/admin/productmanage/AdProductListPage"))
const AdProductRegPage = lazy(() => import("../../../pages/admin/productmanage/AdProductRegPage"))

const ProductManageRouter = [
    {
        path: '/admin',
        element: <AdminRoute role={role} element={<Suspense fallback={Loading}><AdProductListPage/></Suspense>} />
    },
    {
        path: '/admin/products',
        element: <AdminRoute role={role} element={<Suspense fallback={Loading}><AdProductListPage/></Suspense>} />
    },
    {
        path: '/admin/products/add',
        element: <AdminRoute role={role} element={<Suspense fallback={Loading}><AdProductRegPage/></Suspense>} />
    },
];
export default ProductManageRouter;