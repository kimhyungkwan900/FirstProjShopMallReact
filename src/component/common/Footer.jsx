import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm px-4 py-10 border-t">
      <div className="max-w-screen-xl mx-auto space-y-6">

        {/* 상단 링크 */}
        <ul className="flex justify-center space-x-6 font-medium text-gray-600">
          <li className="hover:underline cursor-pointer">매장안내</li>
          <li className="hover:underline cursor-pointer">이용약관</li>
          <li className="hover:underline cursor-pointer">개인정보처리방침</li>
        </ul>

        <hr className="border-gray-300" />

        {/* 정보 박스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* 로고 및 회사정보 */}
          <div className="space-y-2">
            <img src="/images/footer/Logo1234.png" alt="로고" className="w-40 mb-2" />
            <p>INITIUM(주) / 대표자 : 홍길동</p>
            <p>주소 : 서울특별시 마포구 신촌로 176 중앙빌딩 5층</p>
            <p>대표전화 : 1234-1234</p>
            <p>통신판매업 신고번호 : 2025-서울강남-1234</p>
          </div>

          {/* 사업자 및 보증안내 */}
          <div className="space-y-2">
            <p>사업자등록번호 123-45-67890</p>
            <div className="flex items-center">
              <img src="/images/footer/BankLogo.png" alt="보증로고" className="w-8 mr-2" />
              <span>채무지급보증안내</span>
            </div>
            <p>통신판매업 신고번호 : 2025-서울마포-1234</p>
          </div>

          {/* 고객센터 */}
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-800">고객센터 1234-5678</p>
            <p>전화상담 : 10:00 ~ 17:30</p>
            <p>기타상담 : 09:00 ~ 17:30</p>
            <p>점심시간 : 12:00 ~ 13:00</p>
            <p>물류반품 주소 : 서울시 마포동 신촌로 XXX번길 XX</p>
            <p>E-mail : shopping@shop.co.kr</p>
            <p>Fax : 070-1234-5678</p>
          </div>
        </div>

        {/* 저작권 */}
        <div className="text-center text-xs text-gray-500 mt-8">
          © 2025 SHINCHON MALL. ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
};

export default Footer;
