
import MyReviewContent from "../../../component/user/review/MyReviewContent";
import MainHeader from "../../../features/common/Header/MainHeader";
import Footer from "../../../component/common/Footer";
import MypageMenu from "../../../component/user/myOrder/MypageMenu";
import { useContext } from "react";
import { UserContext } from "../../../component/common/Context/UserContext";


const MyReviewPage =() => {
    const {user} = useContext(UserContext);
    const memberId = user?.id;
    return(
        <div>
            <MainHeader/>
            <MypageMenu/>
            <h1 className="text-3xl text-center mt-3 ">MyPage 리뷰 목록</h1>
            <MyReviewContent memberId = {memberId}/>
            <Footer/>
        </div>
    )
}

export default MyReviewPage;