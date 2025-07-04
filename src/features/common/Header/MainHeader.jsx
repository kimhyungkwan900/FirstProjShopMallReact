import LinkedButton from "../../../component/common/Link/LinkedButton";
import SearchBar from "../../../component/user/product/SearchBar";

const MainHeader = () => {
    return(
        <div>
            <header className="w-full bg-neutral-900 text-white px-6 py-2 text-sm">
                <nav className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <LinkedButton to="/brands" lable="브랜드" />
                        <LinkedButton to="/categories" lable="카테고리" />
                    </div>
                    <div className="flex space-x-4">
                        <LinkedButton to="/me" lable="마이 페이지" />
                        <LinkedButton to="/cart" lable="장바구니" />
                    </div>
                </nav>
                <div className="flex mt-3">
                    <div className="ml-auto text-black">
                        <SearchBar />
                    </div>
                </div>
            </header>
        </div>
    )
}

export default MainHeader;