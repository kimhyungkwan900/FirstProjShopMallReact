import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;
const AdOrderListPage = lazy(() => import("../../admin/ordermanage/AdOrderListPage"))
const AdClaimListPage = lazy(() => import("../../admin/ordermanage/AdClaimListPage"))

const OrderManageRouter = [
  {
    path: '/admin/orders',
    element: <Suspense fallback={Loading}><AdOrderListPage/></Suspense>
  },
  {
    path: '/admin/claims',
    element: <Suspense fallback={Loading}><AdClaimListPage/></Suspense>
  },
  // {
  //   path: '/admin/claims/:id',
  //   element: <Suspense fallback={Loading}></Suspense>
  // },
];
export default OrderManageRouter;