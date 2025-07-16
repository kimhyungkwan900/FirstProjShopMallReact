import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
const AdProductListPage = lazy(() => import("../../../pages/admin/productmanage/AdProductListPage"))
const AdProductRegPage = lazy(() => import("../../../pages/admin/productmanage/AdProductRegPage"))

const ProductManageRouter = [
    {
        path: '/admin',
        element: <Suspense fallback={Loading}><AdProductListPage/></Suspense>
    },
    {
        path: '/admin/products',
        element: <Suspense fallback={Loading}><AdProductListPage/></Suspense>
    },
    {
        path: '/admin/products/add',
        element: <Suspense fallback={Loading}><AdProductRegPage/></Suspense>
    },
];
export default ProductManageRouter;