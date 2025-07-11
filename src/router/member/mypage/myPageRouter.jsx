import MyPage from "../../../pages/user/review/MyPage";
import ProfileUpdatePage from "../../../pages/user/userUpdate/ProfileUpdate";
import UserAddressPage from "../../../pages/user/address/UserAddressPage";

const myPageRouter = [

    {
        path:'/mypage',
        element: <MyPage/>,
    },
    {
        path:'/mypage/update',
        element: <ProfileUpdatePage />,
    },
    {
        path:'/mypage/address',
        element: <UserAddressPage />
    }
];

export default myPageRouter;