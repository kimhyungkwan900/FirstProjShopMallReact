import axios from 'axios';

const API_BASE = "http://localhost:8080/api/admin/faqs";

// Faq 목록 조회 + 검색
export const getFaqList = async (searchParams) => {
  const hasCategory =
    typeof searchParams.category === "string" &&
    searchParams.category.trim().length > 0 &&
    searchParams.category !== "전체";

  const hasKeyword =
    typeof searchParams.keyWord === "string" &&
    searchParams.keyWord.trim().length > 0;

  const isSearch = hasCategory || hasKeyword;
  const endpoint = isSearch ? "/search" : "/list";

  //유효한 파라미터만 동적으로 조립
  const params = {
    page: searchParams.page,
    size: searchParams.size,
  };

  if (hasCategory) params.category = searchParams.category;
  if (hasKeyword) params.keyWord = searchParams.keyWord;

  try {
    const response = await axios.get(`${API_BASE}${endpoint}`, {
      params,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log("FAQ 목록 조회 실패 : ", error);
    throw error;
  }
};

// FAQ 등록
export const createFaq = async (faqDto, csrfToken) => {
  try {
    const response = await axios.post(`${API_BASE}/create`, faqDto, {
      withCredentials: true,
    headers: {
      'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken
    }
    });
    return response.data;
  } catch (error) {
    console.error("FAQ 등록 중 오류 발생", error);
    throw error;
  }
};

// FAQ 상세 조회
export const getFaqById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("FAQ 상세 조회 실패", error);
    throw error;
  }
};

// FAQ 수정
export const updateFaq = async (id, faqData, csrfToken) => {
  try {
    const response = await axios.put(`${API_BASE}/update/${id}`, faqData, {
      withCredentials: true,
    headers: {
      'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken
    }
  });
    return response.data;
  } catch (error) {
    console.error("FAQ 수정 실패", error);
    throw error;
  }
};

// FAQ 삭제
export const deleteFaqs = async (ids, csrfToken) => {
  try {
    const response = await axios.delete(`${API_BASE}/delete`, {
      data: ids, // 요청 body에 배열로 전달
      withCredentials: true,
    headers: {
      'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken
    }
    });
    return response.data;
  } catch (error) {
    console.error("FAQ 삭제 실패", error);
    throw error;
  }
};
