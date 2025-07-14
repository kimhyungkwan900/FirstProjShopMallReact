import axios from 'axios';

const API_BASE = "http://localhost:8080/api/admin/faqs"

//Faq 목록 조회 + 검색
// export const getFaqList = async(searchParams) =>{

//   const hasSearch = searchParams.category || searchParams.keyWord;
//   const endpoint = hasSearch ? "/search" : "/list";
//   console.log(`🛰️ 호출 API: ${endpoint} | 조건:`, searchParams);

//     try{
      
//     const response = await axios.get(`${API_BASE}${endpoint}`, {
//       params: {
//         category: searchParams.category,
//         keyWord: searchParams.keyWord,
//         page: searchParams.page,
//         size: searchParams.size,               
//       },
//     });

//     return response.data;

//     } catch(error){
//     console.log("FAQ 목록 조회 실패 : ", error)
//     throw error;
//     } 
// };

// export const getFaqList = async (searchParams) => {
//   const hasCategory = searchParams.category?.trim().length > 0;
//   const hasKeyword = searchParams.keyWord?.trim().length > 0;

//   const isSearch = hasCategory || hasKeyword;

//   const endpoint = isSearch ? "/search" : "/list";
  
//   console.log(`🛰️ 호출 API: ${endpoint} | 조건:`, searchParams);

//   try {
//     const response = await axios.get(`${API_BASE}${endpoint}`, {
//       params: {
//         category: searchParams.category,
//         keyWord: searchParams.keyWord,
//         page: searchParams.page,
//         size: searchParams.size,
//       },
//       withCredentials: true //추가했음 
//     });

//     return response.data;
//   } catch (error) {
//     console.log("FAQ 목록 조회 실패 : ", error);
//     throw error;
//   }
// };

export const getFaqList = async (searchParams) => {
  const hasCategory =
    searchParams.category &&
    searchParams.category.trim().length > 0 &&
    searchParams.category !== "전체"; // 이 조건 추가

  const hasKeyword = searchParams.keyWord?.trim().length > 0;

  const isSearch = hasCategory || hasKeyword;

  const endpoint = isSearch ? "/search" : "/list";

  try {
    const response = await axios.get(`${API_BASE}${endpoint}`, {
      params: {
        category: searchParams.category,
        keyWord: searchParams.keyWord,
        page: searchParams.page,
        size: searchParams.size,
      },
      withCredentials: true,
    });
    console.log("🚀 요청 보낼 endpoint:", endpoint);
    console.log("🚀 조건: category =", searchParams.category, "| keyword =", searchParams.keyWord);

    return response.data;
  } catch (error) {
    console.log("FAQ 목록 조회 실패 : ", error);
    throw error;
  }
};



//FAQ 등록
export const createFaq = async(faqDto) =>{
    try{
        const response = await axios.post(`${API_BASE}/create`, faqDto,{withCredentials: true});
        return response.data;
    }catch(error){
        console.error("FAQ 등록 중 오류 발생", error);
        throw error;
    }

}

//FAQ 상세 조회
export const getFaqById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`,{withCredentials: true});
    return response.data;
  } catch (error) {
    console.error("FAQ 상세 조회 실패", error);
    throw error;
  }
};

//FAQ 수정
export const updateFaq = async (id, faqData) => {
  try {
    const response = await axios.put(`${API_BASE}/update/${id}`, faqData, {withCredentials: true});
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
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("FAQ 삭제 실패", error);
    throw error;
  }
};
