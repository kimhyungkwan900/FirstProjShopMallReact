import axios from "axios"

//고객 요청 전체 조회
export const getClaimList = async ( claimParams ) => {

  const response = await axios.get(`/api/admin/claims`, {params: claimParams});

  // console.log("응답 데이터" + response.data.claims)
  
  return response.data
}

//고객 요청에 대한 상태 변경
export const patchOrderReturn = async (statusInfo) => {

  const response = await axios.patch(`/api/admin/claims/status`, statusInfo)

  return response.data
}