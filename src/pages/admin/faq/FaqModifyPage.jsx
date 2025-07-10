import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getFaqById, updateFaq } from "../../../api/admin/faq/FaqApi";

//수정 페이지

const FaqModifyPage = () =>{
    const navigate = useNavigate();
    const { id } = useParams();

    const [faq, setFaq] = useState({
        category:"",
        question:"",
        answer:"",
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFaq({...faq, [name]:value});
    };

    //상세 페이지 불러오기
    const fetchFaq = async () =>{
        try{
            const data = await getFaqById(id);
            setFaq(data);
        }catch(error){
            console.log("FAQ 상세 조회 실패", error);
            alert("FAQ 정보를 불러오는데 실패 하였습니다");
        }
    };

    //페이지 처음 로딩될때 FAQ 데이터 가져오기
    useEffect(()=>{
        fetchFaq();
    }, [id]);

    //수정 버튼 클릭시 실행됨
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await updateFaq(id, faq);
            alert("FAQ가 수정 되었습니다!")
            navigate("/admin/faq"); 
        }catch(error){
            console.log("FAQ 수정 실패", error);
            alert("수정에 실패했습니다");
        }
    };

        return(
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">FAQ 수정</h1>
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
                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">수정하기</button>
                </div>
            </form>
        </div>
    );
};

export default FaqModifyPage;