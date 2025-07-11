import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFaq } from "../../../api/admin/faq/FaqApi";

//등록 페이지

const FaqResisterPage = () =>{
    const navigate = useNavigate();

    //사용자가 입력한 faq 정보 저장 공간
    const [faq, setFaq] = useState({
        category:"",
        question:"",
        answer:""
    });

    //폼 입력 시 상태 업데이트
    const handleChange = (e) =>{
        const {name, value} = e.target
        setFaq({ ...faq, [name] : value});
    };

    //등록 버튼 클릭시 실행
    const handleSubmit = async (e) =>{
        e.preventDefault(); //새로고침 방지
        try{
            await createFaq(faq);
            alert("FAQ가 등록 되었습니다!")
            // navigate("/admin/faq");//목록페이지로 이동
            navigate("/admin/faq", { state: { resetSearch: true } });
        }catch(error){
            console.log("FAQ 등록 실패", error);
            alert("등록에 실패했습니다");
        }
    };

    return(
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">FAQ 등록</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* 카테고리 */}
                <div>
                    <label className="block font-semibold mb-1">카테고리</label>
                    <select 
                     name="category"
                     value={faq.category}
                     onChange={handleChange}
                     className="w-full border p-2 rounded"
                     required
                    >
                        <option value="">카테고리 선택</option>
                        <option value="배송">배송</option>
                        <option value="취소/교환/반품">취소/교환/반품</option>
                        <option value="환불">환불</option>
                        <option value="주문/결제">주문/결제</option>
                        <option value="쿠폰/포인트">쿠폰/포인트</option>
                        <option value="기타">기타</option>
                    </select>
                </div>

                {/* 질문 */}
                <div>
                    <label className="block font-semibold mb-1">질문</label>
                    <input
                     type="text"
                     name="question"
                     value={faq.question}
                     onChange={handleChange}
                     className="w-full border p-2 rounded"
                     required
                    />
                </div>

                {/* 답변 */}
                <div>
                    <label className="block font-semibord mb-1">답변</label>
                    <textarea
                     name="answer"
                     value={faq.answer}
                     onChange={handleChange}
                     className="w-full border p-2 rounded"
                     rows={5}
                     required
                    /> 
                </div>

                {/* 버튼 */}
                <div className="flex justify-end">
                    <button
                     type="submit"
                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">등록하기</button>
                </div>
            </form>
        </div>
    );
};

export default FaqResisterPage;