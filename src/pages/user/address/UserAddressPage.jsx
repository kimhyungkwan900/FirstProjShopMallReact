
import MainHeader from "../../../features/common/Header/MainHeader";
import UserAddressList from "../../../features/user/Address/UserAddressList";

import MyPageSideMenuBar from "../../../component/user/myOrder/MyPageSideMenuBar";
import Footer from "../../../component/common/Footer";

const UserAddressPage =() =>{
    return(
        <div>
            <div>
                <MainHeader />
            </div>
            <div className="mt-4">
                <UserAddressList />
            </div>
            <div>
                <MyPageSideMenuBar/>
                <Footer/>
            </div>
        </div>
    );
}

export default UserAddressPage;