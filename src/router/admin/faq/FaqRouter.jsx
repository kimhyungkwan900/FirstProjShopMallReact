import { Suspense, lazy } from "react";
import AdminRoute from "../AdminRoute";

const Loading = <div>Loading....</div>;

const role = localStorage.getItem("role")

const FaqListPage = lazy(()=> import("../../../pages/admin/faq/FaqListPage"));
const FaqResisterPage = lazy(()=> import("../../../pages/admin/faq/FaqResisterPage"));
const FaqDetailPage = lazy(()=> import("../../../pages/admin/faq/FaqDetailPage"));
const FaqModifyPage = lazy(()=> import("../../../pages/admin/faq/FaqModifyPage"));

const FaqRouter = [
    {
        path: "/admin/faq",
        element : <AdminRoute role={role} element={<Suspense fallback={Loading}><FaqListPage/></Suspense>} />
    },

    {
        path: "/admin/faq/register",
        element : <AdminRoute role={role} element={<Suspense fallback={Loading}><FaqResisterPage/></Suspense>} />
    },

    {
        path: "/admin/faq/detail/:id",
        element: <AdminRoute role={role} element={<Suspense fallback={Loading}><FaqDetailPage /></Suspense>} />
    },

    {
        path: "/admin/faq/modify/:id",
        element: <AdminRoute role={role} element={<Suspense fallback={Loading}><FaqModifyPage /></Suspense>} />
    },
];

export default FaqRouter;
