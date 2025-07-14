import { useEffect, useState } from "react";
import { getFaqList } from "../../../api/admin/faq/FaqApi";

const UserFaqPage = () => {
  const [category, setCategory] = useState([]);
  const [faqList, setFaqList] = useState([]);
  const [openId, setOpenId] = useState(null);

  const fetchFaqs = async () =>{
    try{
      const response = await getFaqList({category, page:1, size:100});
      setFaqList(response.dtoList || []);
    }catch(err){
      console.log("FAQ 불러오기 실패", error)
    }
  }
  useEffect(() => {
    fetchFaqs();
  }, [category]);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const categories = [
    "배송", "취소/교환/반품", "환불", "주문/결제", "기타"
  ];

   return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">자주 묻는 질문</h1>

      {/* 카테고리 탭 */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded ${
              category === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ 리스트 */}
      <ul className="space-y-4">
        {faqList.map((faq) => (
          <li key={faq.id} className="border-b pb-2">
            <button
              onClick={() => toggle(faq.id)}
              className="w-full text-left font-semibold text-gray-800 hover:text-blue-600"
            >
              Q. [{faq.category}] {faq.question}
            </button>
            {openId === faq.id && (
              <div className="mt-2 text-gray-600 px-4">A. {faq.answer}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFaqPage;
