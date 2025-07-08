import axios from 'axios';

const API_BASE = "http://localhost:8080/api/admin/faqs"

//Faq 목록 조회 + 검색
export const getFaqList = async(searchParams) =>{
    try{
    const response = await axios.get(`${API_BASE}/search`, {
      params: {
        category: params.category,
        keyWord: params.keyWord,
        page: params.page,
        size: params.size,
      },
    });
    return response.data;

    } catch(error){
    console.log("FAQ 목록 조회 실패 : ", error)
    throw error;
    } 
};


//FAQ 등록
export const createFaq = async(faqData) =>{
    const response = await axios.post(`${API_BASE}/create`, faqData);
    return response.data;
}

//FAQ 상세 조회
export const getFaqById = async(id) =>{
    const response = await axios.get(`${API_BASE}/${id}`)
    return response.data;
}

//FAQ 수정
export const updateFaq = async(id, faqData) =>{
    const response = await axios.put(`${API_BASE}/update/${id}`, faqData);
    return response.data;
}

//FAQ 삭제
export const deleteFaqs = async(ids) =>{
    const response = await axios.delete(`${API_BASE}/delete`, {
        data: ids,
    });
    return response.data;
};

