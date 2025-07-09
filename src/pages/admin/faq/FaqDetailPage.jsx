import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFaqById } from "../../../api/admin/faq/FaqApi";

//상세 페이지

const FaqDetailPage = () => {
  const { id } = useParams(); // URL에서 id 가져오기
  const navigate = useNavigate();
  const [faq, setFaq] = useState(null); // FAQ 상세 데이터 상태

  // 페이지가 처음 로딩되었을 때 FAQ 데이터를 불러옴
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const data = await getFaqById(id);
        setFaq(data);
      } catch (error) {
        console.error("FAQ 불러오기 실패", error);
        alert("FAQ 데이터를 불러오는데 실패했습니다.");
      }
    };

    fetchFaq();
  }, [id]);

  if (!faq) return <div className="p-8">로딩 중...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">FAQ 상세조회</h1>
      <div className="border rounded p-4 space-y-4">
        <div>
          <strong>카테고리:</strong> {faq.category}
        </div>
        <div>
          <strong>질문:</strong> {faq.question}
        </div>
        <div>
          <strong>답변:</strong>
          <p className="mt-2 whitespace-pre-line">{faq.answer}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-2">
        <button
          onClick={() => navigate(`/admin/faq/modify/${faq.id}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          수정하기
        </button>
        <button
          onClick={() => navigate("/admin/faq")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default FaqDetailPage;
