import axios from 'axios';

const API_BASE = "http://localhost:8080/api/admin/faqs"

//Faq 목록 조회 + 검색
export const getFaqList = async(searchParams) =>{
    try{

      console.log("📡 getFaqList 실행됨", searchParams);////////////////
      
    const response = await axios.get(`${API_BASE}/search`, {
      params: {
        category: searchParams.category,
        keyWord: searchParams.keyWord,
        page: searchParams.page,
        size: searchParams.size,               
      },
    });

    console.log("✅ 백엔드 응답 확인", response.data); ///////
    return response.data;

    } catch(error){
    console.log("FAQ 목록 조회 실패 : ", error)
    throw error;
    } 
};


//FAQ 등록
export const createFaq = async(faqDto) =>{
    try{
        const response = await axios.post(`${API_BASE}/create`, faqDto);
        return response.data;
    }catch(error){
        console.error("FAQ 등록 중 오류 발생", error);
        throw error;
    }

}

//FAQ 상세 조회
export const getFaqById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error("FAQ 상세 조회 실패", error);
    throw error;
  }
};

//FAQ 수정
export const updateFaq = async (id, faqData) => {
  try {
    const response = await axios.put(`${API_BASE}/update/${id}`, faqData);
    return response.data;
  } catch (error) {
    console.error("FAQ 수정 실패", error);
    throw error;
  }
};

//FAQ 삭제
export const deleteFaqs = async (ids) => {
  try {
    const response = await axios.delete(`${API_BASE}/delete`, {
      data: ids, // 요청 body에 배열로 전달
    });
    return response.data;
  } catch (error) {
    console.error("FAQ 삭제 실패", error);
    throw error;
  }
};
