import { useEffect, useState } from "react";
import { getFaqList } from "../../../api/admin/faq/FaqApi";

const UserFaqPage = () => {
  const [faqList, setFaqList] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    getFaqList({ page: 1, size: 100 })
      .then((data) => setFaqList(data.dtoList))
      .catch((err) => console.error("FAQ 불러오기 실패", err));
  }, []);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">자주 묻는 질문</h1>
      <ul className="space-y-6">
        {faqList.map((faq) => (
          <li key={faq.id} className="border-b pb-4">
            <button
              className="w-full text-left flex items-start space-x-2 group"
              onClick={() => toggle(faq.id)}
            >
              <span className="text-blue-600 font-bold">Q</span>
              <span className="group-hover:text-blue-600 font-medium">{faq.question}</span>
            </button>

            {openId === faq.id && (
              <div className="mt-4 ml-6 p-4 bg-gray-50 rounded-md shadow-sm text-sm text-gray-800">
                <div className="mb-2 font-semibold text-blue-600">A</div>
                <div
                  className="whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: faq.answer }} //HTML 태그 같이 렌더링 가능 하도록 함 
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFaqPage;
