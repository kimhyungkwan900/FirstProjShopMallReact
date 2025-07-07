import LinkedButton from "../../../component/common/Link/LinkedButton";
import LinkedImg from "../../../component/common/Link/LinkedImg";

const MainFooter = () => {


    return(
        <div>
            <footer className="bg-gray-100 text-gray-600 text-sm mt-12 border-t border-gray-300">
                <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
                                        <div>
                        <LinkedButton to="" label="회사소개"/>
                        <LinkedButton to="" label="개인정보 처리방침"/>
                        <LinkedButton to="" label="고객지원"/>
                        <LinkedButton to="" label="이용약관"/>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <p>©1차 프로젝트 쇼핑몰</p>
                        <p>고지사항</p>
                    </div>
                    <div className="mt-2 leading-relaxed">
                        일부 상품의 경우 본 쇼핑몰은 통신판매의 당사자가 아닌 통신판매중개자로서 상품, 정보, 거래에 대한 책임이 제한될 수 있으며,
                        각 상품 상세 페이지에서 구체적인 내용을 확인하시기 바랍니다
                    </div>
                    <div className="flex items-center space-x-4 pt-4">
                        <LinkedImg to="" src="" alt="유튜브" className="" width={24} height={24} />
                        <LinkedImg to="" src="" alt="X(트위터)" className="" width={24} height={24} />
                        <LinkedImg to="" src="" alt="인스타그램" className="" width={24} height={24} />
                        <LinkedImg to="" src="" alt="틱톡" className="" width={24} height={24} />
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default MainFooter;