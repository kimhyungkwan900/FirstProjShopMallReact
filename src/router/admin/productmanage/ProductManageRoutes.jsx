// import AdminMainPage from "../../../pages/admin/AdminMainPage";
// import AdProductListPage from "../../../pages/admin/productmanage/AdProductListPage";
// import AdProductUpdatePage from "../../../pages/admin/productmanage/AdProductUpdatePage";
// import AdProductRegPage from "../../../pages/admin/productmanage/AdProductRegPage"
import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
const AdminMainPage = lazy(() => import("../../../pages/admin/AdminMainPage"))
const AdProductListPage = lazy(() => import("../../../pages/admin/productmanage/AdProductListPage"))
const AdProductUpdatePage = lazy(() => import("../../../pages/admin/productmanage/AdProductUpdatePage"))
const AdProductRegPage = lazy(() => import("../../../pages/admin/productmanage/AdProductRegPage"))

const ProductManageRouter = [
    {
        path: '/admin',
        element: <Suspense fallback={Loading}><AdminMainPage/></Suspense>
    },
    {
        path: '/admin/products',
        element: <Suspense fallback={Loading}><AdProductListPage/></Suspense>
    },
    {
        path: '/admin/products/:id',
        element: <Suspense fallback={Loading}><AdProductUpdatePage/></Suspense>
    },
    {
        path: '/admin/products/add',
        element: <Suspense fallback={Loading}><AdProductRegPage/></Suspense>
    },
];

export default ProductManageRouter;