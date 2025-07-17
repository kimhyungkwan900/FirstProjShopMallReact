import { Suspense, lazy } from "react";
import AdminRoute from "../AdminRoute";

const role = localStorage.getItem("role");

const Loading = <div>Loading...</div>;
const AdOrderListPage = lazy(() => import("../../../pages/admin/ordermanage/AdOrderListPage"))
const AdClaimListPage = lazy(() => import("../../../pages/admin/ordermanage/AdClaimListPage"))


const OrderManageRouter = [
  {
    path: '/admin/orders',
    element: <AdminRoute role={role} element={<Suspense fallback={Loading}><AdOrderListPage/></Suspense>} />
  },
  {
    path: '/admin/claims',
    element: <AdminRoute role={role} element={<Suspense fallback={Loading}><AdClaimListPage/></Suspense>} />
  },
];
export default OrderManageRouter;