import MainFooter from "../../../features/common/Footer/MainFooter";
import MainHeader from "../../../features/common/Header/MainHeader";
import UserAddressList from "../../../features/user/Address/UserAddressList";

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
                <MainFooter />
            </div>
        </div>
    );
}

export default UserAddressPage;