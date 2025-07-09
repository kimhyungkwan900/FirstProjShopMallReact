import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;

const FaqListPage = lazy(()=> import("../../../pages/admin/faq/FaqListPage"));
const FaqResisterPage = lazy(()=> import("../../../pages/admin/faq/FaqResisterPage"));
const FaqDetailPage = lazy(()=> import("../../../pages/admin/faq/FaqDetailPage"));
const FaqModifyPage = lazy(()=> import("../../../pages/admin/faq/FaqModifyPage"));

const FaqRouter = [
    {
        path: "/admin/faq",
        element : <Suspense fallback={Loading}><FaqListPage/></Suspense>,
    },

    {
        path: "/admin/faq/register",
        element : <Suspense fallback={Loading}><FaqResisterPage/></Suspense>
    },

    {
        path: "/admin/faq/detail/:id",
        element: <Suspense fallback={Loading}><FaqDetailPage /></Suspense>,
    },

    {
        path: "/admin/faq/modify/:id",
        element: <Suspense fallback={Loading}><FaqModifyPage /></Suspense>,
    },
];

export default FaqRouter;
