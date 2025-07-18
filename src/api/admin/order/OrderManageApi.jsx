import axios from "axios"

//들어온 주문 조회
export const getOrderList = async ( orderParams ) => {

  const response = await axios.get(`/api/admin/orders`, {params: orderParams});
  
  return response.data
}

//주문 상태 변경
export const patchStatus = async (statusInfo, csrfToken) => {

  const response = await axios.patch(`/api/admin/orders/status`, statusInfo, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken
    }
  })

  return response.data
}
