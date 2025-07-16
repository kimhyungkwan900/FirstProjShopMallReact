import axios from "axios"

//고객 요청 전체 조회
export const getClaimList = async ( claimParams ) => {

  const response = await axios.get(`/api/admin/claims`, {params: claimParams});
  
  return response.data
}

//고객 요청에 대한 상태 변경
export const patchOrderReturn = async (statusInfo, csrfToken) => {

  const response = await axios.patch(`/api/admin/claims/status`, statusInfo,{
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken
    }
  })

  return response.data
}