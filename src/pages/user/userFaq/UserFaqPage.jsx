import { useEffect, useState } from "react";
import { getFaqList } from "../../../api/admin/faq/FaqApi";
import MainHeader from "../../../features/common/Header/MainHeader";
import Footer from "../../../component/common/Footer";

const UserFaqPage = () => {
  const [faqList, setFaqList] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    getFaqList({ page: 1, size: 100 })
      .then((data) => setFaqList(data.dtoList))
      .catch((err) => console.error("❌ FAQ 불러오기 실패", err));
  }, []);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen text-gray-800">
      {/* ✅ 상단 공통 헤더 */}
      <MainHeader />

      {/* ✅ 본문 콘텐츠 */}
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

              {/* ✅ 답변 부분 */}
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

      {/* ✅ 공통 푸터 */}
      <Footer />
    </div>
  );
};

export default UserFaqPage;
