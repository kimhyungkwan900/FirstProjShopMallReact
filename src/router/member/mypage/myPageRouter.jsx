import MyPage from "../../../pages/user/review/MyPage";
import ProfileUpdatePage from "../../../pages/user/userUpdate/ProfileUpdate";

const myPageRouter = [

    {
        path:'/mypage',
        element: <MyPage/>,
    },
    {
        path:'/mypage/update',
        element: <ProfileUpdatePage />,
    }
];

export default myPageRouter;