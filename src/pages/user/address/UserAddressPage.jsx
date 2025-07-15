import MainFooter from "../../../features/common/Footer/MainFooter";
import MainHeader from "../../../features/common/Header/MainHeader";
import UserAddressList from "../../../features/user/Address/UserAddressList";

import MyPageSideMenuBar from "../../../component/user/myOrder/MyPageSideMenuBar";

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
                <MainFooter />
            </div>
        </div>
    );
}

export default UserAddressPage;