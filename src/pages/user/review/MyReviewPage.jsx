
import MyReviewContent from "../../../component/user/review/MyReviewContent";
import MainHeader from "../../../features/common/Header/MainHeader";
import Footer from "../../../component/common/Footer";
import { useContext } from "react";
import { UserContext } from "../../../component/common/Context/UserContext";
import MyPageSideMenuBar from "../../../component/user/myOrder/MyPageSideMenuBar";


const MyReviewPage =() => {
    const {user} = useContext(UserContext);
    const memberId = user?.id;
    return(
        <div>
            <MainHeader/>
            <MyReviewContent memberId = {memberId}/>
            <MyPageSideMenuBar/>
            <Footer/>
        </div>
    )
}

export default MyReviewPage;