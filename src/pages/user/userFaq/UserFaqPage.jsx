import { useEffect, useState } from "react";
import { getFaqList } from "../../../api/admin/faq/FaqApi";
import MainHeader from "../../../features/common/Header/MainHeader";
import Footer from "../../../component/common/Footer";

import MyPageSideMenuBar from "../../../component/user/myOrder/MyPageSideMenuBar";

const UserFaqPage = () => {
  const [category, setCategory] = useState("");
  const [faqList, setFaqList] = useState([]);
  const [openId, setOpenId] = useState(null);

  const fetchFaqs = async () => {
    try {
      const response = await getFaqList({ category, page: 1, size: 100 });
      setFaqList(response.dtoList || []);
    } catch (error) {
      console.log("FAQ 불러오기 실패", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [category]);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen text-gray-800">
      <MainHeader />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-800">
          ❓ 자주 묻는 질문 (FAQ)
        </h1>

        <ul className="space-y-6">
          {faqList.map((faq) => (
            <li
              key={faq.id}
              className="border border-gray-200 rounded-xl bg-white shadow-sm transition-all"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full px-5 py-4 text-left flex items-start gap-3 hover:bg-blue-50 rounded-t-xl"
              >
                <span className="text-blue-600 font-bold">Q</span>
                <span className="text-md font-medium">{faq.question}</span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openId === faq.id
                    ? "max-h-[500px] opacity-100 px-5 pb-5"
                    : "max-h-0 opacity-0 px-5"
                }`}
              >
                {openId === faq.id && (
                  <div className="ml-6 bg-gray-50 p-4 rounded-md text-sm">
                    <div className="mb-2 font-semibold text-blue-600">A</div>
                    <div
                      className="whitespace-pre-line leading-relaxed text-gray-700"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
      <MyPageSideMenuBar/>
      <Footer />
    </div>
  );
};

export default UserFaqPage;
