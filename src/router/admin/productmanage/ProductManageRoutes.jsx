import AdminMainPage from "../../../pages/admin/AdminMainPage";
import AdProductListPage from "../../../pages/admin/productmanage/AdProductListPage";
import AdProductUpdatePage from "../../../pages/admin/productmanage/AdProductUpdatePage";
import AdProductRegPage from "../../../pages/admin/productmanage/AdProductRegPage"

const ProductManageRouter = [
    {
        path: '/admin',
        element: <AdminMainPage/>,
    },
    {
        path: '/admin/products',
        element: <AdProductListPage/>,
    },
    {
        path: '/admin/products/:id',
        element: <AdProductUpdatePage/>,
    },
    {
        path: '/admin/products/add',
        element: <AdProductRegPage/>,
    },
];

export default ProductManageRouter;