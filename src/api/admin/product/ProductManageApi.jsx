import axios from "axios"

//등록 상품 전체 조회, 여기에 검색조건 추가
export const getProductList = async ( productParams ) => {

  const response = await axios.get(`/api/admin/products`, {params: productParams});
  
  return response.data
}

//특정 상품 조회
export const getProductDetail = async (id) => {

  const response = await axios.get(`/api/admin/${id}`);

  return response.data
}

//상품 등록
export const addProduct = async (productInfo) => {

  const response = await axios.post(`api/admin/products/new` , productInfo)

  return response.data
}

//특정 상품 수정
export const patchProduct = async (updateInfo) => {

  const response = await axios.patch(`/api/admin/products/${updateInfo.id}`, updateInfo)

  return response.data
}

//특정 상품 삭제
export const deleteProduct = async (id) => {

  const response = await axios.delete(`api/admin/products/${id}` )

  return response.data
}